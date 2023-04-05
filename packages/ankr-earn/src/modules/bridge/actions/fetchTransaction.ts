import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';
import Web3 from 'web3';
import { Transaction } from 'web3-core';
import { AbiItem } from 'web3-utils';

import { Address } from '@ankr.com/provider';
import { ABI_ERC20 } from '@ankr.com/staking-sdk';

import { getProviderManager } from 'modules/api/getProviderManager';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { SupportedChainIDS } from 'modules/common/const';

const DEPOSIT_METHOD_HASH = '0x90d25074';

export interface IFetchTransactionArgs {
  tx: string;
}

interface IFetchTransactionData {
  tx: string;
  amount: BigNumber;
  token: string;
  chainIdFrom: SupportedChainIDS;
  chainIdTo: SupportedChainIDS;
  toAddress: Address;
}

function parseTransaction(
  basicTransaction: Transaction,
  web3: Web3,
  chainIdFrom: number,
): IFetchTransactionData | null {
  const transaction = basicTransaction as Transaction & Record<string, unknown>;

  try {
    if (transaction.input.indexOf(DEPOSIT_METHOD_HASH) !== 0) {
      return null;
    }

    const input = `0x${transaction.input.slice(10)}`; // cut off first 4 bytes (selector)

    const result = web3.eth.abi.decodeParameters(
      ['address', 'uint256', 'address', 'uint256'],
      input,
    );

    const token = result['0'];
    const chainIdTo = parseInt(result['1'], 10);
    const toAddress = result['2'];
    const amountString = web3.utils.fromWei(result['3']);
    const amount = new BigNumber(amountString);

    return {
      tx: transaction.hash,
      amount,
      token,
      chainIdFrom,
      chainIdTo,
      toAddress,
    };
  } catch {
    return null;
  }
}

export const { useLazyFetchTransactionQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchTransaction: build.query<IFetchTransactionData, IFetchTransactionArgs>(
      {
        queryFn: queryFnNotifyWrapper<
          IFetchTransactionArgs,
          never,
          IFetchTransactionData
        >(async ({ tx }) => {
          const providerManager = getProviderManager();
          const provider = await providerManager.getETHWriteProvider();

          const web3 = provider.getWeb3();

          const transaction = await web3.eth.getTransaction(tx);

          if (!transaction) {
            throw new Error(t('bridge.errors.txn-not-found'));
          }

          const data = parseTransaction(
            transaction,
            web3,
            provider.currentChain,
          );

          if (!data) {
            throw new Error(t('bridge.errors.wrong-txn'));
          }

          const tokenContract = new web3.eth.Contract(
            ABI_ERC20 as AbiItem[],
            data.token,
          );

          const token = await tokenContract.methods.symbol().call();

          data.token = token;

          return { data };
        }),
      },
    ),
  }),
});
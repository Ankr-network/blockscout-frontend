import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { t } from 'common';
import { createAction as createSmartAction } from 'redux-smart-actions';
import Web3 from 'web3';
import { Transaction } from 'web3-core';
import { AbiItem } from 'web3-utils';

import { Address, AvailableWriteProviders } from 'provider';

import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';
import { SupportedChainIDS } from 'modules/common/const';
import { createWalletConnectionGuard } from 'modules/common/utils/createWalletConnectionGuard';

import ABI_ERC20 from '../../api/contract/IERC20.json';

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

export const fetchTransaction = createSmartAction<
  RequestAction<IFetchTransactionData>,
  [IFetchTransactionArgs]
>('bridge/fetchTransaction', ({ tx }) => ({
  request: {
    promise: async () => {
      const providerManager = ProviderManagerSingleton.getInstance();
      const provider = await providerManager.getETHWriteProvider();

      const web3 = provider.getWeb3();

      const transaction = await web3.eth.getTransaction(tx);

      if (!transaction) {
        throw new Error(
          t('bridge.fetch-transaction.error.transaction-not-found'),
        );
      }

      const data = parseTransaction(transaction, web3, provider.currentChain);

      if (!data) {
        throw new Error(t('bridge.fetch-transaction.error.wrong-transaction'));
      }

      const tokenContract = new web3.eth.Contract(
        ABI_ERC20 as AbiItem[],
        data.token,
      );

      const token = await tokenContract.methods.symbol().call();

      data.token = token;

      return data;
    },
  },
  meta: {
    showNotificationOnError: true,
    onRequest: createWalletConnectionGuard(
      AvailableWriteProviders.ethCompatible,
    ),
  },
}));

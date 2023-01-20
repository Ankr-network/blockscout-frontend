import BigNumber from 'bignumber.js';
import { TransactionReceipt } from 'web3-core';

import { Web3KeyReadProvider } from '@ankr.com/provider';

import { configFromEnv, currentEnv, Env, IWeb3TxInfoProps } from '../../common';
import { IFetchTxData } from '../../switcher';

import { getValidXDCAddress } from './utils';

interface IGetTxDataProps extends IWeb3TxInfoProps<Web3KeyReadProvider> {
  env?: Env;
  isUnstake?: boolean;
}

/**
 * Get transaction data.
 *
 * @param {Env | undefined} [env = currentEnv] - current selected environment
 * @param {boolean | undefined} [isUnstake = false] - stake and unstake flag
 * @param {Web3KeyReadProvider} provider - current selected provider
 * @param {string} txHash - transaction hash
 * @returns {Promise<IFetchTxData>}
 */
export const getTxData = async ({
  env = currentEnv,
  isUnstake = false,
  provider,
  txHash,
}: IGetTxDataProps): Promise<IFetchTxData> => {
  const { xdcConfig } = configFromEnv(env);

  const web3 = provider.getWeb3();

  const contractAddress = isUnstake
    ? xdcConfig.XDCStakingPool
    : xdcConfig.ankrXDCToken;

  const tx = await web3.eth.getTransactionReceipt(txHash);

  const amountLog = tx.logs.find(
    ({ address }) => address.toLowerCase() === contractAddress.toLowerCase(),
  );

  const amount = web3.utils.toBN(amountLog?.data ?? '0');

  return {
    amount: new BigNumber(web3.utils.fromWei(amount.toString(10))),
    destinationAddress: getValidXDCAddress(tx.from),
    isPending: tx.transactionIndex === null,
  };
};

/**
 * Get transaction receipt.
 *
 * @param {Web3KeyReadProvider} provider - current selected provider
 * @param {string} txHash - transaction hash
 * @returns {Promise<TransactionReceipt | null>}
 */
export const getTxReceipt = async ({
  provider,
  txHash,
}: IWeb3TxInfoProps<Web3KeyReadProvider>): Promise<TransactionReceipt | null> => {
  const web3 = provider.getWeb3();

  const receipt = await web3.eth.getTransactionReceipt(txHash);

  return receipt as TransactionReceipt | null;
};

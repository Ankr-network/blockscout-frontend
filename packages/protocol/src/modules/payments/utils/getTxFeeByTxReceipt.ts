import BigNumber from 'bignumber.js';
import Web3 from 'web3';
import { TransactionReceipt } from 'web3-core';

export interface IGetTxFeeByTxReceiptParams {
  txReceipt?: TransactionReceipt;
}

export const getTxFeeByTxReceipt = ({
  txReceipt,
}: IGetTxFeeByTxReceiptParams) => {
  if (!txReceipt) {
    return 0;
  }

  const { effectiveGasPrice: gasPrice, gasUsed } = txReceipt;
  const feeWei = new BigNumber(gasPrice).multipliedBy(gasUsed);

  const feeEthString = Web3.utils.fromWei(feeWei.toString(), 'ether');

  return new BigNumber(feeEthString).toNumber();
};

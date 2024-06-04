import Web3 from 'web3';

import { IPaymentHistoryTableEntity } from 'domains/account/types';
import { getRpcUrlByNetwork } from 'modules/api/utils/getRpcUrlByNetwork';

export const mapTransactionsWithTxReceiptData = async (
  transactions: IPaymentHistoryTableEntity[],
) => {
  await Promise.all(
    transactions.map(async transaction => {
      const { network, txHash, creditAnkrAmount, creditUsdAmount } =
        transaction;

      const isNotAnkrPayment =
        (creditAnkrAmount === '' || !creditAnkrAmount) &&
        creditUsdAmount !== '' &&
        network &&
        txHash;

      if (isNotAnkrPayment) {
        const rpcUrl = getRpcUrlByNetwork(network);
        const web3 = new Web3(rpcUrl);

        const txData = await web3.eth.getTransaction(txHash);
        const { input } = txData;

        const { 0: tokenAddress } = web3.eth.abi.decodeParameters(
          ['address'],
          input.slice(10),
        );

        transaction.currencyAddress = tokenAddress;
      }

      return transaction;
    }),
  );

  return transactions;
};

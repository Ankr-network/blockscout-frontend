import { RPC_URLS_BY_NETWORK } from '@ankr.com/provider';
import { ethNetworkIdByBlockchainMap } from 'multirpc-sdk';
import Web3 from 'web3';

import { IPaymentHistoryTableEntity } from 'domains/account/types';

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
        const ethNetworkId = ethNetworkIdByBlockchainMap[network];
        const rpcUrl =
          RPC_URLS_BY_NETWORK[ethNetworkId as keyof typeof RPC_URLS_BY_NETWORK];
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

import Web3 from 'web3';
import { Transaction } from 'web3-core';
import { t } from '@ankr.com/common';

import { EMilliSeconds } from 'modules/common/constants/const';

export interface IWaitForPendingTxParams {
  txHash: string;
  waitFor?: number; // Milliseconds to throw an error if tx is still not found
  web3: Web3;
}

// Chosen taking Etherium average block time
// Reference: https://etherscan.io/chart/blocktime
const fetchingInterval = 12 * EMilliSeconds.Second;

export const waitForPendingTx = async ({
  txHash,
  waitFor,
  web3,
}: IWaitForPendingTxParams) => {
  let attempts = 1;

  const maxAttempts = waitFor
    ? Math.ceil(waitFor / fetchingInterval)
    : undefined;

  return new Promise<Transaction>((resolve, reject) => {
    const intervalId = setInterval(() => {
      attempts++;

      web3.eth
        .getTransaction(txHash)
        .then(tx => {
          if (tx) {
            resolve(tx);

            clearInterval(intervalId);
          }
        })
        .catch(error => {
          reject(error);

          clearInterval(intervalId);
        });

      if (maxAttempts && attempts >= maxAttempts) {
        reject(new Error(t('error.no-tx-by-tx-hash')));

        clearInterval(intervalId);
      }
    }, fetchingInterval);

    // to not wait for the first delay
    web3.eth
      .getTransaction(txHash)
      .then(tx => {
        if (tx) {
          resolve(tx);

          clearInterval(intervalId);
        }
      })
      .catch(error => {
        reject(error);

        clearInterval(intervalId);
      });
  });
};

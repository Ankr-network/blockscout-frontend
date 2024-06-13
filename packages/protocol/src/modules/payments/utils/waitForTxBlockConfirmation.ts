import { EBlockchain } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { EMilliSeconds } from 'modules/common/constants/const';
import { getWeb3Instance } from 'modules/api/utils/getWeb3Instance';

import { getTxBlockConfirmations } from './getTxBlockConfirmations';

export interface IWaitForTxBlockConfirmationParams {
  blocksToConfirm: number;
  network: EBlockchain;
  txHash: string;
}

// Chosen taking Etherium average block time
// Reference: https://etherscan.io/chart/blocktime
const fetchingInterval = 12 * EMilliSeconds.Second;

export const waitForTxBlockConfirmation = async ({
  blocksToConfirm,
  network,
  txHash,
}: IWaitForTxBlockConfirmationParams) => {
  const web3 = getWeb3Instance(network);

  const tx = await web3.eth.getTransaction(txHash);

  if (!tx) {
    throw new Error(t('error.no-tx-by-tx-hash', { txHash }));
  }

  return new Promise<boolean>((resolve, reject) => {
    // to not wait for the first delay
    getTxBlockConfirmations({ tx, web3 })
      .then(confirmations => {
        const isConfirmed = confirmations >= blocksToConfirm;

        if (isConfirmed) {
          resolve(isConfirmed);
        }
      })
      .catch(error => reject(error));

    const intervalId = setInterval(() => {
      getTxBlockConfirmations({ tx, web3 })
        .then(confirmations => {
          const isConfirmed = confirmations >= blocksToConfirm;

          if (isConfirmed) {
            resolve(isConfirmed);

            clearInterval(intervalId);
          }
        })
        .catch(error => {
          reject(error);

          clearInterval(intervalId);
        });
    }, fetchingInterval);
  });
};

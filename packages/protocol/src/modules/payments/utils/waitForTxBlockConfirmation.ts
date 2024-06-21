import { EBlockchain } from 'multirpc-sdk';

import { EMilliSeconds } from 'modules/common/constants/const';
import { getWeb3Instance } from 'modules/api/utils/getWeb3Instance';

import { getTxBlockConfirmations } from './getTxBlockConfirmations';
import { waitForPendingTx } from './waitForPendingTx';

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

  const tx = await waitForPendingTx({
    txHash,
    waitFor: 5 * EMilliSeconds.Minute,
    web3,
  });

  return new Promise<boolean>((resolve, reject) => {
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

    // to not wait for the first delay
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
  });
};

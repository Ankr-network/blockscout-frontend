import { EBlockchain } from 'multirpc-sdk';

import { MilliSeconds } from 'modules/common/constants/const';
import { getWeb3Instance } from 'modules/api/utils/getWeb3Instance';

import { getTxBlockConfirmations } from './getTxBlockConfirmations';

export interface IWaitForTxBlockConfirmationParams {
  blocksToConfirm: number;
  network: EBlockchain;
  txHash: string;
}

// Chosen taking Etherium average block time
// Reference: https://etherscan.io/chart/blocktime
const fetchingInterval = 12 * MilliSeconds.Second;

export const waitForTxBlockConfirmation = ({
  blocksToConfirm,
  network,
  txHash,
}: IWaitForTxBlockConfirmationParams) => {
  const web3 = getWeb3Instance(network);

  return new Promise<boolean>((resolve, reject) => {
    const intervalId = setInterval(() => {
      getTxBlockConfirmations({ txHash, web3 })
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

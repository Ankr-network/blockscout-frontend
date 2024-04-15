import { MultiService } from 'modules/api/MultiService';
import { timeout } from 'modules/common/utils/timeout';
import { getWeb3Instance } from 'modules/api/utils/getWeb3Instance';

import { ETH_BLOCK_TIME } from './const';

const hasPendingTransaction = async (address: string): Promise<boolean> => {
  const service = MultiService.getWeb3Service();

  if (service) {
    const provider = service.getKeyReadProvider();

    const web3 = getWeb3Instance();

    const infuraNodeBlockNumber: number = await provider
      .getWeb3()
      .eth.getBlockNumber();
    const ankrNodeBlockNumber: number = await web3.eth.getBlockNumber();

    if (infuraNodeBlockNumber !== ankrNodeBlockNumber) return true;

    const latestTransactionCount = await web3.eth.getTransactionCount(
      address,
      'latest',
    );
    const pendingTransactionCount = await web3.eth.getTransactionCount(
      address,
      'pending',
    );

    const result = latestTransactionCount !== pendingTransactionCount;

    return result;
  }

  return false;
};

export const waitForPendingTransaction = async (address: string) => {
  await timeout();

  let inProcess = true;

  while (inProcess) {
    // eslint-disable-next-line
    inProcess = await hasPendingTransaction(address);

    if (inProcess) {
      // eslint-disable-next-line
      await timeout(ETH_BLOCK_TIME);
    }
  }

  // because we need to wait other nodes
  await timeout(ETH_BLOCK_TIME * 2);
};

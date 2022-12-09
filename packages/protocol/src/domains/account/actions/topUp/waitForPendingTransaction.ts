import Web3 from 'web3';

import { MultiService } from 'modules/api/MultiService';
import { API_ENV } from 'modules/common/utils/environment';
import { timeout } from 'modules/common/utils/timeout';
import { ETH_BLOCK_TIME } from './const';

const web3 = new Web3(
  API_ENV === 'prod'
    ? 'https://rpc.ankr.com/eth'
    : 'https://rpc.ankr.com/eth_goerli',
);

const hasPendingTransaction = async () => {
  const service = await MultiService.getWeb3Service();

  const provider = service.getKeyProvider();
  const { currentAccount: address } = provider;

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

  return latestTransactionCount !== pendingTransactionCount;
};

export const waitForPendingTransaction = async () => {
  await timeout();

  let inProcess = true;

  while (inProcess) {
    // eslint-disable-next-line
    inProcess = await hasPendingTransaction();

    if (inProcess) {
      // eslint-disable-next-line
      await timeout(ETH_BLOCK_TIME);
    }
  }

  // because we need to wait other nodes
  await timeout(ETH_BLOCK_TIME * 2);
};

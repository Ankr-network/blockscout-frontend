import Web3 from 'web3';

import { MultiService } from 'modules/api/MultiService';
import { API_ENV } from 'modules/common/utils/environment';

const ETH_BLOCK_TIME = 10_000;

export const web3 = new Web3(
  API_ENV === 'prod'
    ? 'https://rpc.ankr.com/eth'
    : 'https://rpc.ankr.com/eth_goerli',
);

const hasPendingTransaction = async () => {
  const service = await MultiService.getInstance();

  const provider = service.getKeyProvider();
  const { currentAccount: address } = provider;

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

const TIMEOUT_FOR_TRANSACTION = 3000;

const timeout = (ms = TIMEOUT_FOR_TRANSACTION) =>
  new Promise(res => setTimeout(res, ms));

export const waitPendingTransaction = async () => {
  await timeout();

  let inProcess = true;

  while (inProcess) {
    // eslint-disable-next-line
    inProcess = await hasPendingTransaction();

    // eslint-disable-next-line
    await timeout(ETH_BLOCK_TIME);
  }

  // because we need to wait other nodes
  await timeout();
};

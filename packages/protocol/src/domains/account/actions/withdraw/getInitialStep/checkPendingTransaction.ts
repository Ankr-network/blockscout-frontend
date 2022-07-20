import Web3 from 'web3';

import { MultiService } from 'modules/api/MultiService';
import { retry } from 'modules/api/utils/retry';
import { API_ENV } from 'modules/common/utils/environment';

// remove this after refactoring
export const web3 = new Web3(
  API_ENV === 'prod'
    ? 'https://rpc.ankr.com/eth/22e282df02e47a6dc906c48db9830304e93e9f12bb74a179152c747c01d4e7b7'
    : 'https://staging.multi-rpc.com/eth_goerli',
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

const timeout = () =>
  new Promise(res => setTimeout(res, TIMEOUT_FOR_TRANSACTION));

export const checkPendingTransaction = async () => {
  await timeout();

  const inProcess = await hasPendingTransaction();

  if (!inProcess) return undefined;

  return retry(
    async () => {
      const stillInPending = await hasPendingTransaction();

      if (stillInPending) {
        throw new Error();
      }

      return inProcess;
    },
    () => false,
  );
};

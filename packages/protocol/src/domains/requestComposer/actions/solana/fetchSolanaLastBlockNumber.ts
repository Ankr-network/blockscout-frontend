import { Connection } from '@solana/web3.js';
import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import {
  SolanaLibraryID,
  SolanaMethod,
} from 'domains/requestComposer/constants/solana';
import { RPC_CALLS_CONFIG } from 'domains/requestComposer/utils/solana/RPCCallsConfig';

export const fetchSolanaLastBlockNumber = createAction<RequestAction<number>>(
  'chains/fetchSolanaLastBlockNumber',
  (web3URL: string) => ({
    request: {
      promise: (async () => null)(),
    },
    meta: {
      hideNotificationOnError: true,
      onRequest: () => ({
        promise: (async (): Promise<number> => {
          const web3Method = RPC_CALLS_CONFIG[SolanaMethod.getBlockHeight];

          const { exec } = web3Method[SolanaLibraryID.SolanaWeb3JS];

          const provider = new Connection(web3URL);

          const response: number = await exec(provider);

          return response;
        })(),
      }),
      poll: 30,
    },
  }),
);

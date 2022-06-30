import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { ProviderManagerSingleton, ANKR_ABI } from '@ankr.com/staking-sdk';

import { configFromEnv } from 'modules/api/config';

export const getAnkrBalance = createAction<RequestAction<BigNumber, BigNumber>>(
  'polygon/getAnkrBalance',
  () => ({
    request: {
      promise: (async (): Promise<BigNumber> => {
        const providerManager = ProviderManagerSingleton.getInstance();
        const provider = await providerManager.getETHWriteProvider();
        const { currentAccount } = provider;
        const { contractConfig } = configFromEnv();
        const ankrContract = provider.createContract(
          ANKR_ABI,
          contractConfig.ankrContract,
        );

        return provider.getErc20Balance(ankrContract, currentAccount);
      })(),
    },
    meta: {
      asMutation: false,
    },
  }),
);

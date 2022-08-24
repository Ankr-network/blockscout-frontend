import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { ANKR_ABI, ProviderManagerSingleton } from '@ankr.com/staking-sdk';

import { configFromEnv } from 'modules/api/config';

import { MATIC_ETH_ACTIONS_PREFIX } from '../const';

export const getAnkrBalance = createAction<RequestAction<BigNumber, BigNumber>>(
  `${MATIC_ETH_ACTIONS_PREFIX}getAnkrBalance`,
  () => ({
    request: {
      promise: (async (): Promise<BigNumber> => {
        const providerManager = ProviderManagerSingleton.getInstance();
        const provider = await providerManager.getETHWriteProvider();
        const { currentAccount } = provider;
        const { contractConfig } = configFromEnv();
        const ankrContract = provider.createContract(
          ANKR_ABI,
          contractConfig.ankrToken,
        );

        return provider.getErc20Balance(ankrContract, currentAccount);
      })(),
    },
    meta: {
      asMutation: false,
    },
  }),
);

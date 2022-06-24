import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { ProviderManagerSingleton } from '@ankr.com/staking-sdk';

import { configFromEnv } from 'modules/api/config';
import ABI_ANKR from 'modules/api/contract/ANKR.json';

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
          ABI_ANKR,
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

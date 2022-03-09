import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { configFromEnv } from 'modules/api/config';
import ABI_ANKR from 'modules/api/contract/ANKR.json';
import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';

import { POLYGON_PROVIDER_ID } from '../const';

export const getAnkrBalance = createAction<RequestAction<BigNumber, BigNumber>>(
  'polygon/getAnkrBalance',
  () => ({
    request: {
      promise: (async (): Promise<BigNumber> => {
        const providerManager = ProviderManagerSingleton.getInstance();
        const provider = await providerManager.getProvider(POLYGON_PROVIDER_ID);
        const { currentAccount } = provider;
        const { contractConfig } = configFromEnv();
        const ankrContract = provider.createContract(
          ABI_ANKR,
          contractConfig.ankrContract,
        );
        const ankrBalance = await provider.getErc20Balance(
          ankrContract,
          currentAccount,
        );

        return ankrBalance;
      })(),
    },
    meta: {
      asMutation: false,
      getData: data => data,
    },
  }),
);

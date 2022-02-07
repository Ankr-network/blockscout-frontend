import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { configFromEnv } from 'modules/api/config';
import ABI_ANKR from 'modules/api/contract/ANKR.json';
import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';
import { createAction } from 'redux-smart-actions';
import { BINANCE_PROVIDER_ID } from '../const';

export const getAnkrBalance = createAction<RequestAction<BigNumber, BigNumber>>(
  'bnb/getAnkrBalance',
  () => ({
    request: {
      promise: (async (): Promise<BigNumber> => {
        const providerManager = ProviderManagerSingleton.getInstance();
        const provider = await providerManager.getProvider(BINANCE_PROVIDER_ID);
        const currentAccount = provider.currentAccount;
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
      getData: data => data,
    },
  }),
);

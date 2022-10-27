import { RequestAction, RequestsStore } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { EthereumSSV, ProviderManagerSingleton } from '@ankr.com/staking-sdk';

import { selectEthProviderData } from 'modules/auth/common/store/authSlice';
import { withStore } from 'modules/common/utils/withStore';

import { SSV_ACTIONS_PREFIX, SSV_ETH_PROVIDER_BY_ENV } from '../const';

type TGetDashboardData = IGetDashboardData | null;

interface IGetDashboardData {
  asETHcBalance: BigNumber;
  asETHcRatio: BigNumber;
}

const { getASETHCBalance, getASETHCRatio } = EthereumSSV;

export const getDashboardData = createAction<
  RequestAction<undefined, TGetDashboardData>
>(`${SSV_ACTIONS_PREFIX}getDashboardData`, () => ({
  request: {
    promise: async (store: RequestsStore): Promise<TGetDashboardData> => {
      const providerManager = ProviderManagerSingleton.getInstance();

      const { address } = selectEthProviderData(store.getState());

      if (!address) {
        return null;
      }

      const provider = await providerManager.getETHReadProvider(
        SSV_ETH_PROVIDER_BY_ENV,
      );

      const [asETHcBalance, asETHcRatio] = await Promise.all([
        getASETHCBalance({
          address,
          provider,
        }),
        getASETHCRatio({
          provider,
        }),
      ]);

      return {
        asETHcBalance,
        asETHcRatio,
      };
    },
  },
  meta: {
    onRequest: withStore,
    showNotificationOnError: true,
  },
}));

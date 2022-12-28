import BigNumber from 'bignumber.js';
import { RootState } from 'store';

import { getProviderManager } from 'modules/api/getProviderManager';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { selectEthProviderData } from 'modules/auth/common/store/authSlice';
import { ACTION_CACHE_SEC } from 'modules/common/const';

import {
  getAnkrSUIBalance,
  getAnkrSUIRatio,
  getMinStake,
  getPendingUnstakes,
  getSUIBalance,
} from '../api';
import { CacheTags, ETH_READ_PROVIDER_ID } from '../const';

interface IGetDashboardData {
  suiBalance: BigNumber;
  pendingUnstakes: BigNumber;
  ankrSUIBalance: BigNumber;
  ankrSUIRatio: BigNumber;
}

export const { useGetSUIDashboardDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getSUIDashboardData: build.query<IGetDashboardData | null, void>({
      queryFn: queryFnNotifyWrapper<void, never, IGetDashboardData | null>(
        async (args, { getState }) => {
          const providerManager = getProviderManager();

          const { address, walletId } = selectEthProviderData(
            getState() as RootState,
          );

          if (!address || !walletId) {
            return {
              data: null,
            };
          }

          const provider = await providerManager.getETHReadProvider(
            ETH_READ_PROVIDER_ID,
          );

          const [
            suiBalance,
            minStake,
            pendingUnstakes,
            ankrSUIBalance,
            ankrSUIRatio,
          ] = await Promise.all([
            getSUIBalance(),
            getMinStake(),
            getPendingUnstakes(),
            getAnkrSUIBalance({ address, provider }),
            getAnkrSUIRatio({ provider }),
          ]);

          return {
            data: {
              suiBalance,
              minStake,
              pendingUnstakes,
              ankrSUIBalance,
              ankrSUIRatio,
            },
          };
        },
      ),
      keepUnusedDataFor: ACTION_CACHE_SEC,
      providesTags: [CacheTags.common],
    }),
  }),
});

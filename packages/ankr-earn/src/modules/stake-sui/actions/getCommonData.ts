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
  getSUIBalance,
} from '../api';
import { CacheTags, ETH_READ_PROVIDER_ID } from '../const';

interface IGetCommonData {
  suiBalance: BigNumber;
  minStake: BigNumber;
  ankrSUIBalance: BigNumber;
  ankrSUIRatio: BigNumber;
}

export const { useGetSUICommonDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getSUICommonData: build.query<IGetCommonData | null, void>({
      queryFn: queryFnNotifyWrapper<void, never, IGetCommonData | null>(
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

          const [suiBalance, minStake, ankrSUIBalance, ankrSUIRatio] =
            await Promise.all([
              getSUIBalance(),
              getMinStake(),
              getAnkrSUIBalance({ address, provider }),
              getAnkrSUIRatio({ provider }),
            ]);

          return {
            data: {
              suiBalance,
              minStake,
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

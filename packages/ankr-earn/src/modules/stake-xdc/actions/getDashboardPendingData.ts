import BigNumber from 'bignumber.js';
import { RootState } from 'store';

import { Web3KeyReadProvider, XDC } from '@ankr.com/staking-sdk';

import { getProviderManager } from 'modules/api/getProviderManager';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { selectEthProviderData } from 'modules/auth/common/store/authSlice';
import { XDC_PROVIDER_BY_ENV, ZERO } from 'modules/common/const';

export const { useGetDashboardPendingDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getDashboardPendingData: build.query<BigNumber, void>({
      queryFn: queryFnNotifyWrapper<void, never, BigNumber>(
        async (args, { getState }) => {
          const providerManager = getProviderManager();

          const { address } = selectEthProviderData(getState() as RootState);

          if (!address) {
            return {
              data: ZERO,
            };
          }

          const provider = await providerManager.getETHReadProvider(
            XDC_PROVIDER_BY_ENV,
          );

          if (!(provider instanceof Web3KeyReadProvider)) {
            return {
              data: ZERO,
            };
          }

          return {
            data: await XDC.getPendingUnstakesAmount({
              address,
              provider,
            }),
          };
        },
      ),
    }),
  }),
});

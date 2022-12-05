import BigNumber from 'bignumber.js';
import { RootState } from 'store';

import {
  ProviderManagerSingleton,
  Web3KeyReadProvider,
  XDC,
} from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { selectEthProviderData } from 'modules/auth/common/store/authSlice';
import {
  featuresConfig,
  isLocal,
  XDC_PROVIDER_BY_ENV,
} from 'modules/common/const';

import { XDC_PROVIDER_ID } from '../const';

type TGetDashboardData = IGetDashboardData | null;

interface IGetDashboardData {
  aXDCcBalance: BigNumber;
  aXDCcRatio: BigNumber;
}

const { getAXDCCBalance, getAXDCCRatio } = XDC;

export const { useGetDashboardDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getDashboardData: build.query<TGetDashboardData, void>({
      queryFn: queryFnNotifyWrapper<void, never, TGetDashboardData>(
        async (args, { getState }) => {
          // TODO Please remove it (development only)
          if (!featuresConfig.xdcStaking) {
            return {
              data: null,
            };
          }

          const providerManager = ProviderManagerSingleton.getInstance();

          const { address, walletId } = selectEthProviderData(
            getState() as RootState,
          );

          if (!address || !walletId) {
            return {
              data: null,
            };
          }

          // Note: For development and resolving issues with CORS
          const provider = isLocal
            ? await providerManager.getProvider(XDC_PROVIDER_ID, walletId)
            : await providerManager.getETHReadProvider(XDC_PROVIDER_BY_ENV);

          if (!(provider instanceof Web3KeyReadProvider)) {
            return {
              data: null,
            };
          }

          const [aXDCcBalance, aXDCcRatio] = await Promise.all([
            getAXDCCBalance({
              address,
              provider,
            }),
            getAXDCCRatio({
              provider,
            }),
          ]);

          return {
            data: {
              aXDCcBalance,
              aXDCcRatio,
            },
          };
        },
      ),
    }),
  }),
});

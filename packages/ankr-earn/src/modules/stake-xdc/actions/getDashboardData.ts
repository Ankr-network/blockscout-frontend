import BigNumber from 'bignumber.js';
import { RootState } from 'store';

import { Web3KeyReadProvider, XDC } from '@ankr.com/staking-sdk';

import { getProviderManager } from 'modules/api/getProviderManager';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { selectEthProviderData } from 'modules/auth/common/store/authSlice';
import { featuresConfig, XDC_PROVIDER_BY_ENV } from 'modules/common/const';

type TGetDashboardData = IGetDashboardData | null;

interface IGetDashboardData {
  ankrXDCBalance: BigNumber;
  ankrXDCRatio: BigNumber;
  xdcBalance: BigNumber;
}

const { getAnkrXDCBalance, getAnkrXDCRatio, getXDCBalance } = XDC;

export const { useGetDashboardDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getDashboardData: build.query<TGetDashboardData, void>({
      queryFn: queryFnNotifyWrapper<void, never, TGetDashboardData>(
        async (args, { getState }) => {
          // TODO Please remove it (development only)
          if (!featuresConfig.xdcActive) {
            return {
              data: null,
            };
          }

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
            XDC_PROVIDER_BY_ENV,
          );

          if (!(provider instanceof Web3KeyReadProvider)) {
            return {
              data: null,
            };
          }

          const [ankrXDCBalance, ankrXDCRatio, xdcBalance] = await Promise.all([
            getAnkrXDCBalance({
              address,
              provider,
            }),
            getAnkrXDCRatio({
              provider,
            }),
            getXDCBalance({
              address,
              provider,
            }),
          ]);

          return {
            data: {
              ankrXDCBalance,
              ankrXDCRatio,
              xdcBalance,
            },
          };
        },
      ),
    }),
  }),
});

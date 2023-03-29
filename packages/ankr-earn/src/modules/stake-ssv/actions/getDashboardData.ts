import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';
import { store } from 'store';

import { EthereumSSV } from '@ankr.com/staking-sdk';

import { getProviderManager } from 'modules/api/getProviderManager';
import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { selectEthProviderData } from 'modules/auth/common/store/authSlice';
import { WalletCacheTags } from 'modules/common/const';

import { SSV_ETH_PROVIDER_BY_ENV } from '../const';

type TGetDashboardData = IGetDashboardData | null;

interface IGetDashboardData {
  asETHcBalance: BigNumber;
  asETHcRatio: BigNumber;
}

const { getASETHCBalance, getASETHCRatio } = EthereumSSV;

export const { useGetDashboardDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getDashboardData: build.query<TGetDashboardData, undefined>({
      queryFn: queryFnNotifyWrapper<undefined, never, TGetDashboardData>(
        async () => {
          const providerManager = getProviderManager();

          const { address } = selectEthProviderData(store.getState());

          if (!address) {
            return { data: null };
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
            data: {
              asETHcBalance,
              asETHcRatio,
            },
          };
        },
        error =>
          getExtendedErrorText(error, t('stake-ssv.errors.get-dashboard-data')),
      ),
      providesTags: [WalletCacheTags.account],
    }),
  }),
});

import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { AVAX_NETWORK_BY_ENV, WalletCacheTags } from 'modules/common/const';
import { Token } from 'modules/common/types/token';

import { DashboardSDK } from '../api/DashboardSDK';

export const { useFetchAETHBBridgedAVAXQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchAETHBBridgedAVAX: build.query<BigNumber, void>({
      queryFn: queryFnNotifyWrapper<void, never, BigNumber>(
        async () => {
          const sdk = await DashboardSDK.getInstance();

          return {
            data: await sdk.getBalance({
              token: Token.aETHb,
              networkID: AVAX_NETWORK_BY_ENV,
            }),
          };
        },
        error =>
          getExtendedErrorText(error, t('dashboard.errors.bridged-eth-bond')),
      ),
      providesTags: [WalletCacheTags.account],
    }),
  }),
});

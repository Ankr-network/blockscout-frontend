import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { ACTION_CACHE_SEC, WalletCacheTags } from 'modules/common/const';

import { CacheTags } from '../const';
import { getBinanceSDK } from '../utils/getBinanceSDK';

export const { useGetBnbPendingUnstakesQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getBnbPendingUnstakes: build.query<BigNumber, void>({
      queryFn: queryFnNotifyWrapper<void, never, BigNumber>(
        async () => {
          const sdk = await getBinanceSDK();
          const data = await sdk.getPendingClaim();

          return { data };
        },
        error => getExtendedErrorText(error, t('stake-bnb.errors.pending')),
      ),
      keepUnusedDataFor: ACTION_CACHE_SEC,
      providesTags: [WalletCacheTags.account, CacheTags.common],
    }),
  }),
});

import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { ACTION_CACHE_SEC, WalletCacheTags } from 'modules/common/const';

import { CacheTags } from '../const';
import { getFantomSDK } from '../utils/getFantomSDK';

export const { useGetFtmPendingUnstakesQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getFtmPendingUnstakes: build.query<BigNumber, void>({
      queryFn: queryFnNotifyWrapper<void, never, BigNumber>(
        async () => {
          const sdk = await getFantomSDK();
          const data = await sdk.getPendingClaim();

          return { data };
        },
        error =>
          getExtendedErrorText(error, t('stake-fantom.errors.pending-values')),
      ),
      keepUnusedDataFor: ACTION_CACHE_SEC,
      providesTags: [CacheTags.common, WalletCacheTags.account],
    }),
  }),
});

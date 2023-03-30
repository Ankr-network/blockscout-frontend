import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { ACTION_CACHE_SEC } from 'modules/common/const';

import { CacheTags } from '../const';
import { getFantomSDK } from '../utils/getFantomSDK';

export const { useGetFtmCertRatioQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getFtmCertRatio: build.query<BigNumber, void>({
      queryFn: queryFnNotifyWrapper<void, never, BigNumber>(
        async () => {
          const sdk = await getFantomSDK();
          const data = await sdk.getACRatio();

          return { data };
        },
        error =>
          // todo: use actual error text
          getExtendedErrorText(error, t('stake-fantom.errors.common-data')),
      ),
      keepUnusedDataFor: ACTION_CACHE_SEC,
      providesTags: [CacheTags.common],
    }),
  }),
});

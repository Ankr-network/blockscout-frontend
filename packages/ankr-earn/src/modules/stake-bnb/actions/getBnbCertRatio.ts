import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { ACTION_CACHE_SEC } from 'modules/common/const';

import { CacheTags } from '../const';
import { getBinanceSDK } from '../utils/getBinanceSDK';

export const { useGetBnbCertRatioQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getBnbCertRatio: build.query<BigNumber, void>({
      queryFn: queryFnNotifyWrapper<void, never, BigNumber>(
        async () => {
          const sdk = await getBinanceSDK();
          const data = await sdk.getACRatio();

          return { data };
        },
        error =>
          // todo: use actual error text
          getExtendedErrorText(error, t('stake-bnb.errors.stats')),
      ),
      keepUnusedDataFor: ACTION_CACHE_SEC,
      providesTags: [CacheTags.common],
    }),
  }),
});

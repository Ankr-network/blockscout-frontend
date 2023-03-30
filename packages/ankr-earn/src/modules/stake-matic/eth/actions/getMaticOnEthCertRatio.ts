import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { ACTION_CACHE_SEC } from 'modules/common/const';

import { CacheTags } from '../const';
import { getPolygonOnEthereumSDK } from '../utils/getPolygonOnEthereumSDK';

export const { useGetMaticOnEthCertRatioQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getMaticOnEthCertRatio: build.query<BigNumber, void>({
      queryFn: queryFnNotifyWrapper<void, never, BigNumber>(
        async () => {
          const sdk = await getPolygonOnEthereumSDK();
          const data = await sdk.getACRatio();

          return { data };
        },
        error =>
          // todo: use actual error text
          getExtendedErrorText(
            error,
            t('stake-matic-common.errors.common-data'),
          ),
      ),
      keepUnusedDataFor: ACTION_CACHE_SEC,
      providesTags: [CacheTags.common],
    }),
  }),
});

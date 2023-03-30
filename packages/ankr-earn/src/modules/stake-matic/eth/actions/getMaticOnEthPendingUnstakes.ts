import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { ACTION_CACHE_SEC } from 'modules/common/const';

import { CacheTags } from '../const';
import { getPolygonOnEthereumSDK } from '../utils/getPolygonOnEthereumSDK';

export const { useGetMaticOnEthPendingUnstakesQuery } = web3Api.injectEndpoints(
  {
    endpoints: build => ({
      getMaticOnEthPendingUnstakes: build.query<BigNumber, void>({
        queryFn: queryFnNotifyWrapper<void, never, BigNumber>(
          async () => {
            const sdk = await getPolygonOnEthereumSDK();
            const data = await sdk.getPendingClaim();

            return { data };
          },
          error =>
            getExtendedErrorText(
              error,
              t('stake-matic-common.errors.pending-values'),
            ),
        ),
        keepUnusedDataFor: ACTION_CACHE_SEC,
        providesTags: [CacheTags.common],
      }),
    }),
  },
);

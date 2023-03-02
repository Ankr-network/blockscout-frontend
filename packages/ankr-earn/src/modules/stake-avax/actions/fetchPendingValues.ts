import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { ACTION_CACHE_SEC } from 'modules/common/const';

import { CacheTags } from '../const';
import { getAvalancheSDK } from '../utils/getAvalancheSDK';

interface IFetchPendingValuesResponseData {
  pendingAavaxbUnstakes: BigNumber;
  pendingAavaxcUnstakes: BigNumber;
}

export const {
  useGetAVAXPendingValuesQuery,
  useLazyGetAVAXPendingValuesQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getAVAXPendingValues: build.query<IFetchPendingValuesResponseData, void>({
      queryFn: queryFnNotifyWrapper<
        void,
        never,
        IFetchPendingValuesResponseData
      >(
        async () => {
          const sdk = await getAvalancheSDK();
          const { pendingBond, pendingCertificate } =
            await sdk.getPendingData();

          return {
            data: {
              pendingAavaxbUnstakes: pendingBond,
              pendingAavaxcUnstakes: pendingCertificate,
            },
          };
        },
        error =>
          getExtendedErrorText(error, t('stake-avax.errors.pending-values')),
      ),
      keepUnusedDataFor: ACTION_CACHE_SEC,
      providesTags: [CacheTags.common],
    }),
  }),
});

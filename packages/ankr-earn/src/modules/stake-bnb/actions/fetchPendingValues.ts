import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { ACTION_CACHE_SEC, featuresConfig, ZERO } from 'modules/common/const';

import { CacheTags } from '../const';
import { getBinanceSDK } from '../utils/getBinanceSDK';

interface IFetchPendingValuesResponseData {
  pendingAbnbbUnstakes: BigNumber;
  pendingAbnbcUnstakes: BigNumber;
}

export const { useGetBNBPendingValuesQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getBNBPendingValues: build.query<IFetchPendingValuesResponseData, void>({
      queryFn: queryFnNotifyWrapper<
        void,
        never,
        IFetchPendingValuesResponseData
      >(
        async () => {
          if (featuresConfig.disableHeavyRequestsForTestnet) {
            return {
              data: {
                pendingAbnbbUnstakes: ZERO,
                pendingAbnbcUnstakes: ZERO,
              },
            };
          }

          const sdk = await getBinanceSDK();

          const {
            pendingBond: pendingAbnbbUnstakes,
            pendingCertificate: pendingAbnbcUnstakes,
          } = await sdk.getPendingData();

          return {
            data: {
              pendingAbnbbUnstakes,
              pendingAbnbcUnstakes,
            },
          };
        },
        error => getExtendedErrorText(error, t('stake-bnb.errors.bnb-history')),
      ),
      keepUnusedDataFor: ACTION_CACHE_SEC,
      providesTags: [CacheTags.common],
    }),
  }),
});
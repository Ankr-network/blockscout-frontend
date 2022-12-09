import BigNumber from 'bignumber.js';

import { AvalancheSDK } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { ACTION_CACHE_SEC, featuresConfig, ZERO } from 'modules/common/const';

import { CacheTags } from '../const';

interface IFetchPendingValuesResponseData {
  pendingAavaxbUnstakes: BigNumber;
  pendingAavaxcUnstakes: BigNumber;
}

export const { useGetAVAXPendingValuesQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getAVAXPendingValues: build.query<IFetchPendingValuesResponseData, void>({
      queryFn: queryFnNotifyWrapper<
        void,
        never,
        IFetchPendingValuesResponseData
      >(async () => {
        if (featuresConfig.disableHeavyRequestsForTestnet) {
          return {
            data: {
              pendingAavaxbUnstakes: ZERO,
              pendingAavaxcUnstakes: ZERO,
            },
          };
        }

        const sdk = await AvalancheSDK.getInstance();
        const { pendingBond, pendingCertificate } = await sdk.getPendingData();

        return {
          data: {
            pendingAavaxbUnstakes: pendingBond,
            pendingAavaxcUnstakes: pendingCertificate,
          },
        };
      }),
      keepUnusedDataFor: ACTION_CACHE_SEC,
      providesTags: [CacheTags.common],
    }),
  }),
});

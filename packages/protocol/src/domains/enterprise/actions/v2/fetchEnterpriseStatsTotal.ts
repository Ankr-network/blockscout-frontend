import { ETelemetryTopOf, IUsageStats, IUsageStatsParams } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';
import { RootState } from 'store';

import {
  selectEnterpriseChainsWithUsage,
  setBlockchainsWithUsage,
} from '../../store/enterpriseSlice';

export interface IFetchUsageStatsParams extends IUsageStatsParams {
  shouldSetBlockchains: boolean;
}

export const {
  endpoints: { chainsFetchEnterpriseV2StatsTotal },
  useChainsFetchEnterpriseV2StatsTotalQuery,
  useLazyChainsFetchEnterpriseV2StatsTotalQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchEnterpriseV2StatsTotal: build.query<
      IUsageStats,
      IFetchUsageStatsParams
    >({
      queryFn: createNotifyingQueryFn(
        async ({ shouldSetBlockchains = false, ...params }) => {
          const service = MultiService.getService();
          const enterpriseGateway = service.getEnterpriseGateway();

          const data = await enterpriseGateway.getEnterpriseUsage(params);

          if (shouldSetBlockchains) {
            // if the flag is presented, blockchains from this response should be saved to blockchains list in store
          }

          return { data };
        },
      ),
      onQueryStarted: async (
        { shouldSetBlockchains },
        { dispatch, getState, queryFulfilled },
      ) => {
        const { data } = await queryFulfilled;

        if (!data) {
          return;
        }

        const currentBlockchains = selectEnterpriseChainsWithUsage(
          getState() as RootState,
        );

        if (currentBlockchains.length && !shouldSetBlockchains) {
          return;
        }

        const blockchains = data.tops?.find(
          topItem => topItem.top_of === ETelemetryTopOf.BLOCKCHAIN,
        )?.elements;

        if (blockchains) {
          // setting the blockchains list on first fetch to have ability to use this data in future
          // this list is used to filter chains on the dashboard
          dispatch(
            setBlockchainsWithUsage(blockchains.map(({ name }) => name)),
          );
        }
      },
    }),
  }),
  overrideExisting: true,
});

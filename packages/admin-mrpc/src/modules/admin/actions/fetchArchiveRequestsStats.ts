import {
  IArchiveRequestsStatsRequest,
  IArchiveRequestsStatsResponse,
} from 'multirpc-sdk';

import { web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';

export const {
  useFetchArchiveRequestsStatsQuery,
  useLazyFetchArchiveRequestsStatsQuery,
  endpoints: { fetchArchiveRequestsStats },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchArchiveRequestsStats: build.query<
      IArchiveRequestsStatsResponse,
      IArchiveRequestsStatsRequest
    >({
      queryFn: async ({ blockchain, user }) => {
        const service = await MultiService.getWeb3Service();
        const stats = await service
          .getBackofficeGateway()
          .getArchiveRequestsStats({ blockchain, user });

        return {
          data: stats,
        };
      },
    }),
  }),
  overrideExisting: true,
});

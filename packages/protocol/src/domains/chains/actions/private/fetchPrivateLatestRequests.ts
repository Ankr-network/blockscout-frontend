import { LatestRequest, Web3Address } from 'multirpc-sdk';
import { Chain } from '@ankr.com/chains-list';

import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';

export interface IFetchPrivateChainsInfoResult {
  chains: Chain[];
  allChains: Chain[];
}

export interface IPrivateLastRequestParams {
  group?: Web3Address;
}

export const {
  endpoints: { privateLatestRequests },
  useLazyPrivateLatestRequestsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    privateLatestRequests: build.query<
      LatestRequest[],
      IPrivateLastRequestParams
    >({
      queryFn: async ({ group }) => {
        const service = MultiService.getService();

        const { user_requests: userRequests } = await service
          .getAccountingGateway()
          .getLatestRequests({ group, limit: 10 });

        return {
          data: userRequests,
        };
      },
    }),
  }),
});

import axios from 'axios';
import { IWorkerGlobalStatus } from 'multirpc-sdk';
import { ChainID } from '@ankr.com/chains-list';

import { web3Api } from 'store/queries';

export interface StandaloneStatsParams {
  chainId: ChainID;
  url: string;
}

export interface StandaloneStats {
  chainId: ChainID;
  data: IWorkerGlobalStatus;
}

export const {
  endpoints: { chainsFetchStandaloneRequests },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchStandaloneRequests: build.query<
      StandaloneStats,
      StandaloneStatsParams
    >({
      queryFn: async ({ chainId, url }) => {
        const api = axios.create();

        const { data } = await api.get<IWorkerGlobalStatus>(url);

        return {
          data: {
            data,
            chainId,
          },
        };
      },
    }),
  }),
});

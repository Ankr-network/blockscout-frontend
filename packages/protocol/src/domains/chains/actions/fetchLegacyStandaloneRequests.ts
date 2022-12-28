import axios from 'axios';

import { ChainID } from 'modules/chains/types';
import { web3Api } from 'store/queries';

interface IRequestResult {
  bytes: number;
  cachedBytes: number;
  cachedRequests: number;
  requests: number;
}
interface IEntries {
  data: IRequestResult;
  fromTime: string;
  toTime: string;
}

interface IFetchTotalRequestsResponseData {
  entries: IEntries[];
  totals: IRequestResult;
}

// stats for 1 day
export interface ILegacyStandaloneStats {
  chainId: ChainID;
  cachedRequests: number;
  requests: number;
  totalRequestsHistory: Record<string, number>;
}

export interface LegacyStandaloneStatsParams {
  chainId: ChainID;
  url: string;
}

export const {
  useChainsFetchLegacyStandaloneRequestsQuery,
  endpoints: { chainsFetchLegacyStandaloneRequests },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchLegacyStandaloneRequests: build.query<
      ILegacyStandaloneStats,
      LegacyStandaloneStatsParams
    >({
      queryFn: async ({ chainId, url }) => {
        const api = axios.create();

        const { data } = await api.get<IFetchTotalRequestsResponseData>(url);

        const totalRequestsHistory: Record<string, number> = {};

        data.entries.forEach((item: IEntries) => {
          const key = new Date(item.toTime).getTime().toString();
          const value = item.data.requests;
          totalRequestsHistory[key] = value;
        });

        return {
          data: {
            cachedRequests: data.totals.cachedRequests,
            chainId,
            requests: data.totals.requests,
            totalRequestsHistory,
          },
        };
      },
    }),
  }),
});

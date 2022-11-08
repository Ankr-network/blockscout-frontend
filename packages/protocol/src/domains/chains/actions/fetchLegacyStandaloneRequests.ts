import { RequestAction } from '@redux-requests/core';
import { ChainID } from 'modules/chains/types';
import { createAction as createSmartAction } from 'redux-smart-actions';

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

export const fetchLegacyStandaloneRequests = createSmartAction<
  RequestAction<IFetchTotalRequestsResponseData, ILegacyStandaloneStats>
>('chains/fetchLegacyStandaloneRequests', (url: string, chainId: ChainID) => ({
  request: {
    url,
    method: 'get',
    data: {},
  },
  meta: {
    driver: 'axios',
    asMutation: true,
    hideNotificationOnError: true,
    getData: data => {
      const totalRequestsHistory: Record<string, number> = {};

      data.entries.forEach((item: IEntries) => {
        const key = new Date(item.toTime).getTime().toString();
        const value = item.data.requests;
        totalRequestsHistory[key] = value;
      });

      return {
        chainId,
        cachedRequests: data.totals.cachedRequests,
        requests: data.totals.requests,
        totalRequestsHistory,
      };
    },
  },
}));

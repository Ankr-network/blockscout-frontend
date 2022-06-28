import { RequestAction } from '@redux-requests/core';
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

interface IFetchTotalRequestData {
  cachedRequests: number;
  requests: number;
  totalRequestsHistory: Record<string, number>;
}

export const fetchTotalRequests = createSmartAction<
  RequestAction<IFetchTotalRequestsResponseData, IFetchTotalRequestData>
>('chains/fetchTotalRequests', (url: string) => ({
  request: {
    url,
    method: 'get',
    data: {},
  },
  meta: {
    driver: 'axios',
    asMutation: true,
    getData: data => {
      const totalRequestsHistory: Record<string, number> = {};
      data.entries.forEach((item: IEntries) => {
        const key = new Date(item.toTime).getTime().toString();
        const value = item.data.requests;
        totalRequestsHistory[key] = value;
      });
      return {
        cachedRequests: data.totals.cachedRequests,
        requests: data.totals.requests,
        totalRequestsHistory,
      };
    },
  },
}));

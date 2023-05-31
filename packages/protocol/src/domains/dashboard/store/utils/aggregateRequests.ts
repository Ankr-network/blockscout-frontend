import { Requests, RequestsEntry } from '../types';

export const aggregateRequests = (requests: RequestsEntry[]) =>
  requests.reduce<Requests>((result, [timestamp, count]) => {
    result[timestamp] = (result[timestamp] ?? 0) + count;

    return result;
  }, {});

import { LatestRequest } from 'multirpc-sdk';

export const areRequestsEmpty = (requests?: LatestRequest[]) =>
  Array.isArray(requests) && requests.length === 0;

import { LatestRequest } from 'multirpc-sdk';

export const areRequestsEmpty = (requests?: LatestRequest[]) =>
  !requests || requests.length === 0;

import { StatsByRangeResponse } from 'multirpc-sdk';

export const MAX_BLOCKCHAIN_ICONS_NUMBER = 5;

export const getRequests = (stats: StatsByRangeResponse) =>
  Object.entries(stats)
    .sort(
      ([timestampA], [timestampB]) => Number(timestampB) - Number(timestampA),
    )
    .map(([, requests]) => requests);

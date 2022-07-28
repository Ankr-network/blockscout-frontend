import { TotalRequestsHistory } from 'multirpc-sdk';

export const isTotalRequestsHistoryNotEmpty = (
  history?: TotalRequestsHistory,
): history is TotalRequestsHistory =>
  !(history && Object.keys(history).length === 0);

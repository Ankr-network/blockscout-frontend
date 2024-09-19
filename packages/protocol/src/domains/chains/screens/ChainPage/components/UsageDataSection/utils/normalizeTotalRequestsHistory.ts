import { TotalRequestsHistory } from 'multirpc-sdk';

export const normalizeTotalRequestsHistory = (
  history: TotalRequestsHistory = {},
): TotalRequestsHistory =>
  Object.fromEntries(
    Object.entries(history)
      .sort(([a], [b]) => +a - +b)
      .slice(0, -1),
  );

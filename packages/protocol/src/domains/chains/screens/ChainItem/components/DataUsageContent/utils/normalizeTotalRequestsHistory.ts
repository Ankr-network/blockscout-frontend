type TotalRequestsHistory = Record<string, number>;

export const normalizeTotalRequestsHistory = (
  history: TotalRequestsHistory = {},
): TotalRequestsHistory =>
  Object.fromEntries(
    Object.entries(history)
      .sort(([a], [b]) => +a - +b)
      .slice(0, -1),
  );

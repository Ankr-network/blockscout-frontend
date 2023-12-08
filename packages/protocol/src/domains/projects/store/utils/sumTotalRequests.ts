export const sumTotalRequests = (totalRequests: Record<string, number>) => {
  const totalRequestsList = Object.entries(totalRequests);

  const totalRequestsCount = totalRequestsList.reduce(
    (count, [, requests]) => count + requests,
    0,
  );

  return totalRequestsCount;
};

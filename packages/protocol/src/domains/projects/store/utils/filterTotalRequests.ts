export interface FilterTotalRequestsParams {
  filter: (timestamp: number) => boolean;
  totalRequests: Record<string, number>;
}

export const filterTotalRequests = ({
  filter,
  totalRequests,
}: FilterTotalRequestsParams) => {
  const totalRequestsList = Object.entries(totalRequests);
  const filteredTotalRequestsList = totalRequestsList.filter(([timestamp]) =>
    filter(Number(timestamp)),
  );

  const filteredTotalRequests = Object.fromEntries(filteredTotalRequestsList);

  return filteredTotalRequests;
};

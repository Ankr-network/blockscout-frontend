import { MethodRequest, PreparedRequest } from 'domains/chains/types';
import { getMaxCalls } from './getMaxCalls';

const MAX_AMOUNT_OF_REQUESTS = 10;

export const prepareRequests = (requests: MethodRequest[]) => {
  const max = getMaxCalls(requests);

  return requests
    .map<PreparedRequest>(({ method, calls }) => ({
      calls,
      method,
      percent: calls / max,
    }))
    .sort((a, b) => b.calls - a.calls)
    .slice(0, MAX_AMOUNT_OF_REQUESTS);
};

import { MethodRequest, PreparedRequest } from 'domains/chains/types';
import { getMaxCalls } from './getMaxCalls';

export const prepareRequests = (requests: MethodRequest[]) => {
  const max = getMaxCalls(requests);

  return requests
    .map<PreparedRequest>(({ method, calls }) => ({
      calls,
      method,
      percent: calls / max,
    }))
    .sort((a, b) => b.calls - a.calls);
};

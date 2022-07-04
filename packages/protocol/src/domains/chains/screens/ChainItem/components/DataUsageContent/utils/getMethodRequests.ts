import { MethodRequest } from 'domains/chains/types';
import { PrivateStatTopRequests } from 'multirpc-sdk';

export const getMethodRequests = (topRequests: PrivateStatTopRequests = {}) =>
  Object.entries(topRequests).map<MethodRequest>(([method, calls]) => ({
    method,
    calls,
  }));

import { MethodRequest } from 'domains/chains/types';

export const getMaxCalls = (requests: MethodRequest[]) =>
  Math.max(...requests.map(({ calls }) => calls));

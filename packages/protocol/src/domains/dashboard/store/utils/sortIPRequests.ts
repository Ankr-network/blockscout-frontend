import { IpDetails } from 'multirpc-sdk';

export const sortIPRequests = (ipRequests: IpDetails[] = []) =>
  [...ipRequests].sort((a, b) => b.count - a.count);

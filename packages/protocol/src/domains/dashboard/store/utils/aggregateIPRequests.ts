import { IpDetails } from 'multirpc-sdk';

import { sortIPRequests } from './sortIPRequests';

type IpDetailsMap = Record<string, IpDetails>;

const joinIPRequests = (
  { count, ip, total_cost }: IpDetails,
  ipRequest?: IpDetails,
): IpDetails => ({
  count: (ipRequest?.count || 0) + (count || 0),
  ip,
  total_cost: (ipRequest?.total_cost || 0) + (total_cost || 0),
});

export const aggregateIPRequests = (ipRequests: IpDetails[]): IpDetails[] =>
  sortIPRequests(
    Object.values(
      ipRequests.reduce<IpDetailsMap>((result, ipRequest) => {
        const { ip } = ipRequest;

        result[ip] = joinIPRequests(ipRequest, result[ip]);

        return result;
      }, {}),
    ),
  );

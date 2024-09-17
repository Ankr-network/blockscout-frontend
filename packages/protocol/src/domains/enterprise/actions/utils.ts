import { IApiPrivateStats, PrivateStats } from 'multirpc-sdk';

export const getEnterpriseStats = (data: IApiPrivateStats): PrivateStats => {
  return {
    ...data,
    totalRequests: data?.total_requests || 0,
  };
};

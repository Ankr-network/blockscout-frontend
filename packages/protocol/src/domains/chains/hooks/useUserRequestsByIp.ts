import { PrivateStatsInternal } from 'multirpc-sdk';

interface IUserRequestsByIpPrarms {
  weekPrivateStats: PrivateStatsInternal;
  chainId: string;
}

export interface UserRequestsByIpData {
  ip: string;
  count: number;
}

const MAX_NUM_OF_TOP_REQUEST_IP = 5;

export const useUserRequestsByIp = ({
  weekPrivateStats,
  chainId,
}: IUserRequestsByIpPrarms): UserRequestsByIpData[] => {
  if (weekPrivateStats && chainId in weekPrivateStats) {
    const topIps = weekPrivateStats[chainId]?.ips_count?.top_ips ?? [];

    const chainData = [...topIps]
      .sort((a, b) => Number(b.count) - Number(a.count))
      .slice(0, MAX_NUM_OF_TOP_REQUEST_IP);

    return (
      chainData?.map(item => ({ ip: item.ip, count: Number(item.count) })) ?? []
    );
  }

  return [];
};

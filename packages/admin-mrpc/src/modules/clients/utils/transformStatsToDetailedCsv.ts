import {
  BlockchainID,
  BlockchainStatsTopRequests,
  PrivateStats,
} from 'multirpc-sdk';
import { format } from 'date-fns';

import { DATE_STRING_FORMAT } from 'modules/admin/const';

interface ICsvData {
  blockchain: BlockchainID;
  method: string;
  count: number;
  date: string;
}

export const transformStatsToDetailedCsv = (stats: PrivateStats) => {
  return Object.values(stats)
    ?.reduce((acc: ICsvData[], stat) => {
      const requests = stat?.counts
        ? // @ts-ignore
          Object.entries(stat?.counts).map(([timestamp, { topRequests }]) => {
            return (
              topRequests?.map((request: BlockchainStatsTopRequests) => ({
                date: format(new Date(Number(timestamp)), DATE_STRING_FORMAT),
                blockchain: stat.blockchain,
                method: request.method,
                count: request.count,
              })) ?? []
            );
          })
        : [];

      return acc.concat(requests.flat());
    }, [])
    .sort((a, b) => {
      const methodComparison = a.method?.localeCompare(b.method);
      const blockchainComparison = a.blockchain?.localeCompare(b.blockchain);
      const dateComparison =
        new Date(a.date).getTime() - new Date(b.date).getTime();

      return methodComparison || blockchainComparison || dateComparison;
    });
};

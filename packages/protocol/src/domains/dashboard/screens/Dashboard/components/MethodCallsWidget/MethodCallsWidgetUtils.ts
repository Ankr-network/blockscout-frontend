import { PrivateStatTopRequests } from 'multirpc-sdk';
import { PieChartData } from '../BasePieChart';
import { MAX_TOP_CATEGORIES_INDEX } from '../BasePieChart/utils/getColor';

interface MappedRequest {
  method: string;
  usage: number;
  count: number;
}

export const mapRequests = ({
  method,
  count,
  total,
}: PrivateStatTopRequests & { total: number }) => {
  const usage = Math.round((count * 100) / total);

  return {
    method,
    count,
    usage,
  };
};

export const mapChartData = (requestsMapped: MappedRequest[]) => {
  return requestsMapped.reduce<PieChartData[]>(
    (acc, { method, usage }, currentIndex) => {
      if (currentIndex > MAX_TOP_CATEGORIES_INDEX) {
        const otherValueAccumulatorIndex = MAX_TOP_CATEGORIES_INDEX + 1;

        acc[otherValueAccumulatorIndex] = {
          name: 'other',
          value: (acc[otherValueAccumulatorIndex]?.value || 0) + usage,
        };

        return acc;
      }

      return [
        ...acc,
        {
          name: method,
          value: usage,
        },
      ];
    },
    [],
  );
};

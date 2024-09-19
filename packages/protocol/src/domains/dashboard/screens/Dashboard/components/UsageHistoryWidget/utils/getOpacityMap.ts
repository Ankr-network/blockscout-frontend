import { UsageHistoryData } from 'domains/dashboard/store/types';

const TOP_OPACITIES = [1, 0.6, 0.4, 0.2];
const DEFAULT_OPACITY = 0.15;

export const getOpacityMap = (data: UsageHistoryData[]) =>
  data
    .map(({ calls }) => calls)
    .sort((a, b) => b - a)
    .reduce<Record<number, number>>((map, calls, index) => {
      map[calls] = TOP_OPACITIES[index] || DEFAULT_OPACITY;

      return map;
    }, {});

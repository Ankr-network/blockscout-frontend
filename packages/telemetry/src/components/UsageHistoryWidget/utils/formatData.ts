import { FormattedHistoryData } from '../types';
import { getMaxCalls } from './getMaxCalls';
import { getOpacityMap } from './getOpacityMap';
import { UsageHistoryDataMapped } from '../../../types';

const ONE_HUNDRED_PERCENTS = 100;

export const formatData = (
  data: UsageHistoryDataMapped[],
): FormattedHistoryData[] => {
  const max = getMaxCalls(data);
  const opacities = getOpacityMap(data);

  return data.map(({ calls, ...rest }, index) => ({
    ...rest,
    isFirst: index === 0,
    calls,
    length: (Number(calls) / max) * ONE_HUNDRED_PERCENTS,
    opacity: opacities[Number(calls)],
  }));
};

import { FormattedHistoryData } from '../types';
import { UsageHistoryData } from 'domains/dashboard/store/types';
import { getMaxCalls } from './getMaxCalls';
import { getOpacityMap } from './getOpacityMap';

const ONE_HUNDRED_PERCENTS = 100;

export const formatData = (data: UsageHistoryData[]) => {
  const max = getMaxCalls(data);
  const opacities = getOpacityMap(data);

  return data.map<FormattedHistoryData>(({ calls, ...rest }, index) => ({
    ...rest,
    isFirst: index === 0,
    calls,
    length: (calls / max) * ONE_HUNDRED_PERCENTS,
    opacity: opacities[calls],
  }));
};

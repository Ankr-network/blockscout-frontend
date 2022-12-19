import { Timeframe } from 'domains/chains/types';
import { usageTimeframe } from 'domains/chains/constants/timeframes';
import { useSwitcher } from 'modules/common/hooks/useSwitcher';

export const useTimeframe = (isLoggedIn?: boolean) => {
  const [items, currentItem] = isLoggedIn
    ? [usageTimeframe, Timeframe.Day]
    : [usageTimeframe, Timeframe.Month];

  return useSwitcher({
    items,
    currentItem: items.findIndex(item => item === currentItem),
    resetDeps: [isLoggedIn],
  });
};

import { Timeframe } from 'domains/chains/types';
import { usageTimeframe } from 'domains/chains/constants/timeframes';
import { useSwitcher } from 'modules/common/hooks/useSwitcher';

export const useTimeframe = (isLoggedIn?: boolean) => {
  const [items, currentItem] = isLoggedIn
    ? [usageTimeframe, Timeframe.Day]
    : [usageTimeframe, Timeframe.Month];

  return useSwitcher({
    currentItem: items.findIndex(item => item === currentItem),
    items,
    resetDeps: [isLoggedIn],
  });
};

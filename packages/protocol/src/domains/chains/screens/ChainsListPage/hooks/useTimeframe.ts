import { Timeframe } from 'modules/chains/types';
import { USAGE_FULL_TIMEFRAME_LIST } from 'domains/chains/constants/timeframes';
import { useSwitcher } from 'modules/common/hooks/useSwitcher';

export const useTimeframe = (isLoggedIn?: boolean) => {
  const currentItem = isLoggedIn ? Timeframe.Day : Timeframe.Month;

  return useSwitcher({
    currentItem: USAGE_FULL_TIMEFRAME_LIST.findIndex(
      item => item === currentItem,
    ),
    items: USAGE_FULL_TIMEFRAME_LIST,
    resetDeps: [isLoggedIn],
  });
};

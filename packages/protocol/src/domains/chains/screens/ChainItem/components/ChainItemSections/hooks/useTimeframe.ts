import { useMemo } from 'react';
import { Timeframe } from '@ankr.com/chains-list';

import { Tab, useTabs } from 'modules/common/hooks/useTabs';
import { USAGE_FULL_TIMEFRAME_LIST } from 'domains/chains/constants/timeframes';

export interface TimeframeResult {
  timeframe: Timeframe;
  timeframeTabs: Tab<Timeframe>[];
}

interface UseTimeframeParams {
  timeframes?: Timeframe[];
  initialTimeframe?: Timeframe;
}

export const useTimeframe = ({
  initialTimeframe = Timeframe.Month,
  timeframes = USAGE_FULL_TIMEFRAME_LIST,
}: UseTimeframeParams): TimeframeResult => {
  const tabs = useMemo(
    () => timeframes.map<Tab<Timeframe>>(id => ({ id })),
    [timeframes],
  );

  const [timeframeTabs, timeframeTab] = useTabs<Timeframe>({
    initialTabID: initialTimeframe,
    tabs,
  });

  return { timeframe: timeframeTab?.id || tabs[0].id, timeframeTabs };
};

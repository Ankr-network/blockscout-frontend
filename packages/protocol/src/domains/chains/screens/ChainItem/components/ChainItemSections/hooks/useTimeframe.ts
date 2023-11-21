import { useMemo } from 'react';

import { Timeframe } from 'modules/chains/types';
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
  timeframes = USAGE_FULL_TIMEFRAME_LIST,
  initialTimeframe = Timeframe.Month,
}: UseTimeframeParams): TimeframeResult => {
  const tabs = useMemo(
    () => timeframes.map<Tab<Timeframe>>(id => ({ id })),
    [timeframes],
  );

  const [timeframeTabs, timeframeTab] = useTabs<Timeframe>({
    initialTabID: initialTimeframe,
    tabs,
  });

  return { timeframe: timeframeTab?.id ?? tabs[0].id, timeframeTabs };
};

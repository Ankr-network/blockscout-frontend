import { useMemo } from 'react';

import { Timeframe } from 'domains/chains/types';
import { Tab, useTabs } from 'modules/common/hooks/useTabs';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { usageTimeframe } from 'domains/chains/constants/timeframes';

export interface TimeframeResult {
  timeframe: Timeframe;
  timeframeTabs: Tab<Timeframe>[];
}

export const useTimeframe = (initialTimeframe?: Timeframe): TimeframeResult => {
  const { hasPrivateAccess } = useAuth();

  const [tabs, initialTabID] = useMemo(() => {
    const [timeframes, initial] = hasPrivateAccess
      ? [usageTimeframe, Timeframe.Day]
      : [usageTimeframe, Timeframe.Month];

    const timeframesResult = timeframes.map<Tab<Timeframe>>(id => ({ id }));

    return [timeframesResult, initialTimeframe || initial];
  }, [hasPrivateAccess, initialTimeframe]);

  const [timeframeTabs, timeframeTab] = useTabs<Timeframe>({
    initialTabID,
    tabs,
  });
  const timeframe = timeframeTab?.id ?? tabs[0].id;

  return { timeframe, timeframeTabs };
};

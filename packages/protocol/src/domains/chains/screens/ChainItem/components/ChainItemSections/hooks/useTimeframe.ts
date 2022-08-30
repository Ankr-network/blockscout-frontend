import { useMemo } from 'react';

import { Timeframe } from 'domains/chains/types';
import { Tab, useTabs } from 'modules/common/hooks/useTabs';
import {
  privateTimeframes,
  publicTimeframes,
} from 'domains/chains/constants/timeframes';
import { useAuth } from 'domains/auth/hooks/useAuth';

export interface TimeframeResult {
  timeframe: Timeframe;
  timeframeTabs: Tab<Timeframe>[];
}

export const useTimeframe = (): TimeframeResult => {
  const { isWalletConnected } = useAuth();

  const [tabs, initialTabID] = useMemo(() => {
    const [timeframes, initial] = isWalletConnected
      ? [privateTimeframes, Timeframe.Day]
      : [publicTimeframes, Timeframe.Month];

    return [timeframes.map<Tab<Timeframe>>(id => ({ id })), initial];
  }, [isWalletConnected]);

  const [timeframeTabs, timeframeTab] = useTabs<Timeframe>({
    initialTabID,
    tabs,
  });
  const timeframe = timeframeTab?.id ?? tabs[0].id;

  return { timeframe, timeframeTabs };
};

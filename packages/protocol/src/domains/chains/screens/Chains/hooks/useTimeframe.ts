import { Timeframe } from 'domains/chains/types';
import {
  privateTimeframes,
  publicTimeframes,
} from 'domains/chains/constants/timeframes';
import { useSwitcher } from 'modules/common/hooks/useSwitcher';

export const useTimeframe = (isWalletConnected: boolean) => {
  const [items, currentItem] = isWalletConnected
    ? [privateTimeframes, Timeframe.Day]
    : [publicTimeframes, Timeframe.Month];

  return useSwitcher({
    items,
    currentItem: items.findIndex(item => item === currentItem),
    resetDeps: [isWalletConnected],
  });
};

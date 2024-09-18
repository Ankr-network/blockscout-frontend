import { PieChartData } from '@ankr.com/telemetry';
import { ChainID } from '@ankr.com/chains-list';

import { ChainCalls } from '../../../types';
import { text } from './text';

const MAX_PIECES = 5;

export interface PieChartDataParams {
  chainCalls: ChainCalls[];
  totalRequests: number;
}

const squeezeChainCalls = (sorted: ChainCalls[]) => {
  const firstItems = sorted.slice(0, MAX_PIECES - 1);
  const others = sorted.slice(MAX_PIECES - 1);

  const lastItem: ChainCalls = {
    calls: others.reduce((sum, item) => sum + item.calls, 0),
    name: text('others') as ChainID,
  };

  return [...firstItems, lastItem];
};

const formatChainCalls = (calls: ChainCalls[]) => {
  const sorted = [...calls].sort((a, b) => b.calls - a.calls);

  return calls.length > MAX_PIECES ? squeezeChainCalls(sorted) : sorted;
};

export const getPieChartData = ({
  chainCalls,
  totalRequests,
}: PieChartDataParams) => {
  const max = totalRequests || 1;

  return formatChainCalls(chainCalls).map<PieChartData>(({ calls, name }) => ({
    name,
    value: calls / max,
  }));
};

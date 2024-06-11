import { PieChartData } from '@ankr.com/telemetry';

import { text } from 'domains/dashboard/screens/Dashboard/components/ChainCallsWidget/utils/text';

const MAX_PIECES = 5;

export const squeezeChainCalls = (
  elements: PieChartData[] | null = [],
): PieChartData[] => {
  const firstItems = elements?.slice(0, MAX_PIECES - 1);

  if (!firstItems) {
    return [];
  }

  const others = elements?.slice(MAX_PIECES - 1);

  if (!others?.length) {
    return firstItems;
  }

  const lastItem: PieChartData = {
    value: others?.reduce((sum, item) => sum + Number(item.value), 0),
    name: text('others'),
  };

  return [...firstItems, lastItem];
};

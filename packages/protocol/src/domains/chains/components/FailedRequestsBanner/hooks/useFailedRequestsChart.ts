import { useHasBreakdown } from 'uiKit/Theme/useTheme';
import { NARROW_TWO_COLUMN_WIDTH } from '../const';

const NARROW_BAR_WIDTH = 7;
const BAR_WIDTH = 20;

export const useFailedRequestsChart = () => {
  const hasRowBreakDown = useHasBreakdown(NARROW_TWO_COLUMN_WIDTH);

  return {
    barWidth: hasRowBreakDown ? NARROW_BAR_WIDTH : BAR_WIDTH,
  };
};

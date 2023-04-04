import { useIsLGDown } from 'uiKit/Theme/useTheme';

const NARROW_BAR_WIDTH = 7;
const BAR_WIDTH = 20;

export const useRequestsChart = () => {
  const isLGDown = useIsLGDown();

  return {
    barWidth: isLGDown ? NARROW_BAR_WIDTH : BAR_WIDTH,
  };
};

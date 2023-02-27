import { useState, useCallback } from 'react';
import { CategoricalChartState } from 'recharts/types/chart/generateCategoricalChart';

export const useActiveBarIndex = () => {
  const [activeBarIndex, setActiveBarIndex] = useState<number | undefined>(
    undefined,
  );

  const handleMouseMove = useCallback(
    (state: CategoricalChartState) =>
      setActiveBarIndex(
        state.isTooltipActive ? state.activeTooltipIndex : undefined,
      ),
    [setActiveBarIndex],
  );

  return {
    activeBarIndex,
    handleMouseMove,
  };
};

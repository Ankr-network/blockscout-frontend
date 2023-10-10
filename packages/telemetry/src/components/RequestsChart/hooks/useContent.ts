import { useMemo } from 'react';

import { RequestsChartProps } from '../types';

export const useContent = ({
  data,
  isLoading,
}: Pick<RequestsChartProps, 'data' | 'isLoading'>) =>
  useMemo(() => {
    const hasChart = !isLoading && data.length > 0;
    const hasPlaceholder = !isLoading && !hasChart;

    return { hasChart, hasPlaceholder, hasPreloader: isLoading };
  }, [data, isLoading]);

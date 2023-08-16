import { useMemo } from 'react';
import BaseChart, { Props } from 'react-apexcharts';

import { useIsSMDown } from 'modules/themes/useTheme';

import { chartBaseOptions, chartStyle, getChartOptions } from './ChartUtils';

interface ChartProps {
  xValues: string[];
  series: Props['series'];
  hasGradient: boolean;
  foreColor?: string;
  gridBorderColor?: string;
}

export const Chart = ({
  xValues,
  series,
  hasGradient,
  foreColor,
  gridBorderColor,
}: ChartProps) => {
  const isSMDown = useIsSMDown();
  const mergedOptions = useMemo(
    () => ({
      ...chartBaseOptions,
      ...getChartOptions({
        dates: xValues,
        hasGradient,
        isSMDown,
        foreColor,
        gridBorderColor,
      }),
    }),
    [xValues, hasGradient, isSMDown, foreColor, gridBorderColor],
  );

  return (
    <BaseChart
      style={chartStyle}
      options={mergedOptions}
      series={series}
      type="area"
      height="320"
      width="100%"
    />
  );
};

import { Theme } from '@material-ui/core';
import { useIsSMDown } from 'modules/themes/useTheme';
import { useMemo } from 'react';
import BaseChart, { Props } from 'react-apexcharts';

import { chartStyle, chartBaseOptions, getChartOptions } from './ChartUtils';

interface ChartProps {
  xValues: string[];
  series: Props['series'];
  theme?: Theme;
  hasGradient: boolean;
  foreColor?: string;
}

export const Chart = ({
  xValues,
  series,
  theme,
  hasGradient,
  foreColor,
}: ChartProps) => {
  const isSMDown = useIsSMDown();
  const mergedOptions = useMemo(
    () => ({
      ...chartBaseOptions,
      ...getChartOptions(xValues, hasGradient, theme, isSMDown, foreColor),
    }),
    [xValues, hasGradient, theme, isSMDown, foreColor],
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

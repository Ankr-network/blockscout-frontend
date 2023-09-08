import { t } from '@ankr.com/common';

export const text = (key: string, vars?: unknown) =>
  t(`requests-chart.${key}`, vars);

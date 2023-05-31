import { t } from '@ankr.com/common';

export const text = (key: string, vars?: unknown) =>
  t(`dashboard.requests-chart.${key}`, vars);

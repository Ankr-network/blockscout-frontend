import { tHTML } from '@ankr.com/common';

export const html = (key: string, vars?: unknown) =>
  tHTML(`dashboard.requests-chart.${key}`, vars);

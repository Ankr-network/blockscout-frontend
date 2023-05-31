import { t } from '@ankr.com/common';

export const text = (key: string, vars?: unknown) =>
  t(`dashboard.requests-by-ip.${key}`, vars);

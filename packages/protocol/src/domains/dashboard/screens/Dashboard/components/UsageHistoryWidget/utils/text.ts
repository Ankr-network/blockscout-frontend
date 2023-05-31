import { t } from '@ankr.com/common';

export const getText = (key: string, vars?: unknown) =>
  t(`dashboard.usage-history.${key}`, vars);

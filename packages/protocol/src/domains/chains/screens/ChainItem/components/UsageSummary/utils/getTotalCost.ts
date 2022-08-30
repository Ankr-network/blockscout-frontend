import { t } from 'modules/i18n/utils/intl';

export const getTotalCost = (cost = 0) =>
  t('chain-item.usage-data.usage-summary.cost.value', { cost });

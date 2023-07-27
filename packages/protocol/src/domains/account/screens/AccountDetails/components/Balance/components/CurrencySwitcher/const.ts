import { t } from '@ankr.com/common';

import { Currency } from 'domains/account/types';

export const valuesMap: Record<Currency, () => string> = {
  [Currency.ANKR]: () => t('account.currencies.ankr'),
  [Currency.CREDIT]: () => t('account.currencies.credit'),
};

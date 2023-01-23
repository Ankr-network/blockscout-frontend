import { Currency } from 'domains/account/types';
import { t } from '@ankr.com/common';

export const valuesMap: Record<Currency, string> = {
  [Currency.ANKR]: t('account.currencies.ankr'),
  [Currency.CREDIT]: t('account.currencies.credit'),
};

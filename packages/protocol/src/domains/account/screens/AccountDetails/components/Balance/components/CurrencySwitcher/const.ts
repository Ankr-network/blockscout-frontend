import { Currency } from 'domains/account/types';
import { t } from 'modules/i18n/utils/intl';

export const valuesMap: Record<Currency, string> = {
  [Currency.ANKR]: t('account.currencies.ankr'),
  [Currency.CREDIT]: t('account.currencies.credit'),
};

import React from 'react';
import { Button } from '@material-ui/core';

import { Currency } from 'domains/account/types';
import { currencies } from './const';
import { useStyles } from './CurrencySwitcherStyles';
import { useSwitcher } from 'domains/account/hooks/useSwitcher';
import { t } from 'modules/i18n/utils/intl';

export interface CurrencySwitcherProps {
  onSwitch?: (currency: Currency) => void;
}

const labelsMap: Record<Currency, string> = {
  [Currency.ANKR]: t('account.currencies.ankr'),
  [Currency.CREDIT]: t('account.currencies.credit'),
};

export const CurrencySwitcher = ({ onSwitch }: CurrencySwitcherProps) => {
  const [currency, onClick] = useSwitcher({ items: currencies, onSwitch });

  const classes = useStyles();

  return (
    <Button
      className={classes.currencySwitcherRoot}
      onClick={onClick}
      variant="outlined"
    >
      {labelsMap[currency]}
    </Button>
  );
};

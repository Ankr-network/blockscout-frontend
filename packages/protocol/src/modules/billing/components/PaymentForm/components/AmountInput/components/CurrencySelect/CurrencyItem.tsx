import { Check } from '@ankr.com/ui';

import { ECurrency } from 'modules/billing/types';

import { useCurrencySelectStyles } from './useCurrencySelectStyles';
import { getStablecoinIcon } from '../../utils/getStablecoinIcon';

interface ICurrencyItemProps {
  currency: ECurrency;
  isActive: boolean;
}

export const CurrencyItem = ({ currency, isActive }: ICurrencyItemProps) => {
  const { classes } = useCurrencySelectStyles();

  return (
    <div className={classes.itemRoot}>
      <div className={classes.currencyRoot}>
        <div className={classes.currencyIcon}>
          {getStablecoinIcon(currency)}
        </div>

        {currency}
      </div>

      {isActive && <Check className={classes.checkIcon} />}
    </div>
  );
};

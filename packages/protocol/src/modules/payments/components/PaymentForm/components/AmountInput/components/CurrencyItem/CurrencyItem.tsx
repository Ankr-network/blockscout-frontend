import { Check } from '@ankr.com/ui';

import { ECurrency } from 'modules/payments/types';

import { getStablecoinIcon } from '../../utils/getStablecoinIcon';
import { useCurrencyItemStyles } from './useCurrencyItemStyles';

export interface ICurrencyItemProps {
  currency: ECurrency;
  isActive: boolean;
}

export const CurrencyItem = ({ currency, isActive }: ICurrencyItemProps) => {
  const { classes } = useCurrencyItemStyles();

  return (
    <div className={classes.root}>
      <div className={classes.currency}>
        <div className={classes.currencyIcon}>
          {getStablecoinIcon(currency)}
        </div>

        {currency}
      </div>
      {isActive && <Check className={classes.checkIcon} />}
    </div>
  );
};

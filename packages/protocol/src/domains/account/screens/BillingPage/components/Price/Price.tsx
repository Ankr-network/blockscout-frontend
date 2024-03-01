import { RecurrentInterval } from 'multirpc-sdk';
import { tHTML } from '@ankr.com/common';

import { usePriceStyles } from './PriceStyles';

export interface PriceProps {
  amount: string;
  className?: string;
  period: RecurrentInterval;
}

export const Price = ({ amount, className, period }: PriceProps) => {
  const { classes, cx } = usePriceStyles();

  return (
    <div className={cx(classes.root, className)}>
      {tHTML('account.account-details.price', { amount, period })}
    </div>
  );
};

import { RecurrentInterval } from 'multirpc-sdk';
import { tHTML } from '@ankr.com/common';
import { ReactNode } from 'react';

import { usePriceStyles } from './PriceStyles';

export interface PriceProps {
  amount: string;
  className?: string;
  period: RecurrentInterval;
  title?: ReactNode;
}

export const Price = ({ amount, className, period, title }: PriceProps) => {
  const { classes, cx } = usePriceStyles();

  return (
    <div className={cx(classes.root, className)}>
      {title}
      {tHTML('account.account-details.price', { amount, period })}
    </div>
  );
};

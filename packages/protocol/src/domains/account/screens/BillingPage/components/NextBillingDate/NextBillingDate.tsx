import { Calendar } from '@ankr.com/ui';
import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { useNextBillingDateStyles } from './NextBillingDateStyles';

export interface NextBillingDateProps {
  className?: string;
  date: string;
}

export const NextBillingDate = ({
  className,
  date: outerDate,
}: NextBillingDateProps) => {
  const { classes, cx } = useNextBillingDateStyles();

  const date = useMemo(() => new Date(Number(outerDate)), [outerDate]);

  return (
    <div className={cx(classes.root, className)}>
      <Calendar className={classes.icon} />
      {t(`account.account-details.next-billing-date`, { date })}
    </div>
  );
};

import { CreditCard } from '@ankr.com/ui';
import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { useNextBillingDateStyles } from './NextBillingDateStyles';

export interface NextBillingDateProps {
  className?: string;
  customText?: string;
  date?: string;
}

export const NextBillingDate = ({
  className,
  customText,
  date: outerDate,
}: NextBillingDateProps) => {
  const { classes, cx } = useNextBillingDateStyles();

  const renderDate = useMemo(() => {
    if (!outerDate) {
      return undefined;
    }

    const date = new Date(Number(outerDate));

    return t('account.account-details.next-billing-date', { date });
  }, [outerDate]);

  return (
    <div className={cx(classes.root, className)}>
      <CreditCard className={classes.icon} />
      {customText}
      {renderDate}
    </div>
  );
};

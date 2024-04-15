import { OverlaySpinner } from '@ankr.com/ui';
import { Typography } from '@mui/material';
import { t, tHTML } from '@ankr.com/common';

import { IAmount } from 'modules/billing/types';

import { useDealAmountStyles } from './useDealAmountStyles';

export interface IDealAmountProps {
  amount?: IAmount;
  className?: string;
  isLoading: boolean;
  title: string;
}

const amountKey = 'account.payment-form.deal-proposal.amount';

export const DealAmount = ({
  amount,
  className,
  isLoading,
  title,
}: IDealAmountProps) => {
  const { classes, cx } = useDealAmountStyles();

  if (isLoading) {
    return <OverlaySpinner />;
  }

  return (
    <div className={cx(classes.dealAmountRoot, className)}>
      <div className={classes.dealAmountHeader}>
        <div className={classes.marker} />
        <Typography
          className={classes.dealAmountTitle}
          variant="subtitle2"
          color="primary"
        >
          {title}
        </Typography>

        <div className={classes.labelWrapper}>
          <Typography className={classes.label} variant="body3">
            {t('account.payment-form.deal-proposal.label')}
          </Typography>
        </div>

        <Typography
          className={classes.amount}
          variant="subtitle2"
          component="p"
        >
          {tHTML(amountKey, { amount: amount?.value ?? 0 })}
        </Typography>
      </div>
      <ul className={classes.dealAmountList}>
        <li className={classes.dealAmountListItem}>
          <Typography
            className={classes.listItemText}
            variant="body4"
            color="textSecondary"
          >
            {t('account.payment-form.deal-proposal.list.0')}
          </Typography>
        </li>
        <li className={classes.dealAmountListItem}>
          <Typography
            className={classes.listItemText}
            variant="body4"
            color="textSecondary"
          >
            {t('account.payment-form.deal-proposal.list.1')}
          </Typography>
        </li>
        <li className={classes.dealAmountListItem}>
          <Typography
            className={classes.listItemText}
            variant="body4"
            color="textSecondary"
          >
            {t('account.payment-form.deal-proposal.list.2')}
          </Typography>
        </li>
        <li className={classes.dealAmountListItem}>
          <Typography
            className={classes.listItemText}
            variant="body4"
            color="textSecondary"
          >
            {t('account.payment-form.deal-proposal.list.3')}
          </Typography>
        </li>
      </ul>
    </div>
  );
};

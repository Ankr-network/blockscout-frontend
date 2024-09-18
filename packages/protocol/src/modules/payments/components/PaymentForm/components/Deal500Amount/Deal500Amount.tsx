import { OverlaySpinner } from '@ankr.com/ui';
import { Typography } from '@mui/material';
import { t, tHTML } from '@ankr.com/common';

import { IAmount } from 'modules/payments/types';
import { PromoLabel } from 'modules/common/components/PromoLabel/PromoLabel';

import { useDeal500AmountStyles } from './useDeal500AmountStyles';

export interface IDeal500AmountProps {
  amount?: IAmount;
  className?: string;
  isLoading: boolean;
  title: string;
}

const amountKey = 'account.payment-form.deal-proposal.amount';

export const Deal500Amount = ({
  amount,
  className,
  isLoading,
  title,
}: IDeal500AmountProps) => {
  const { classes, cx } = useDeal500AmountStyles();

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

        <PromoLabel
          label={t('account.payment-form.deal-proposal.label')}
          className={classes.labelWrapper}
        />

        <Typography
          className={classes.amount}
          variant="subtitle2"
          component="p"
        >
          {tHTML(amountKey, { amount: amount?.value || 0 })}
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

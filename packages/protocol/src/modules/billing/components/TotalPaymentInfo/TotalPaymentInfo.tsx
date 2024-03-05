import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { ENetwork, IFeeDetails } from 'modules/billing/types';
import {
  IRenderPaymentSummaryAmountParams,
  renderPaymentSummaryAmount,
} from 'modules/billing/utils/renderPaymentSummaryAmount';

import { DetailedAmount } from './components/DetailedAmount';
import { useTotalPaymentInfoStyles } from './useTotalPaymentInfoStyles';

export interface ITotalPaymentInfoProps
  extends IRenderPaymentSummaryAmountParams {
  feeDetails?: IFeeDetails;
  network?: ENetwork;
}

export const TotalPaymentInfo = ({
  amount,
  currency,
  feeDetails,
  network,
}: ITotalPaymentInfoProps) => {
  const { classes } = useTotalPaymentInfoStyles();

  return (
    <Typography className={classes.root} component="div" variant="subtitle2">
      <div className={classes.amount}>
        {t('account.payment-summary-dialog.total-label')}
        {renderPaymentSummaryAmount({ amount, currency })}
      </div>
      {feeDetails && network && (
        <DetailedAmount
          amount={amount}
          className={classes.detailedAmount}
          currency={currency}
          feeDetails={feeDetails}
          network={network}
        />
      )}
    </Typography>
  );
};

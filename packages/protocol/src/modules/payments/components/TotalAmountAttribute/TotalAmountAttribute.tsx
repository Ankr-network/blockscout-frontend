import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { renderUSDAmount } from 'modules/payments/utils/renderUSDAmount';

import { IGetTotalAmountParams, getTotalAmount } from './utils/getTotalAmount';
import {
  IRenderTotalAmountDescriptionParams,
  renderTotalAmountDescription,
} from './utils/renderTotalAmountDescription';
import { useTotalAmountAttributeStyles } from './useTotalAmountAttributeStyles';

export interface ITotalAmountAttributeProps
  extends IGetTotalAmountParams,
    IRenderTotalAmountDescriptionParams {}

export const TotalAmountAttribute = ({
  allowanceFee,
  allowanceFeeUSD,
  amount,
  amountUsd,
  currency,
  depositFee,
  depositFeeUSD,
  network,
}: ITotalAmountAttributeProps) => {
  const { classes } = useTotalAmountAttributeStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.label} variant="subtitle2">
        {t('account.success-crypto-payment-dialog.total-label')}
      </Typography>
      <div className={classes.value}>
        <Typography className={classes.totalAmount} variant="subtitle2">
          {renderUSDAmount({
            amount: getTotalAmount({
              amountUsd,
              allowanceFeeUSD,
              depositFeeUSD,
            }),
          })}
        </Typography>
        <Typography className={classes.totalAmountDescription} variant="body3">
          {renderTotalAmountDescription({
            amount,
            allowanceFee,
            currency,
            depositFee,
            network,
          })}
        </Typography>
      </div>
    </div>
  );
};

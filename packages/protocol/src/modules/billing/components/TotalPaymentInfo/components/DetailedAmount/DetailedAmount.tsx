import { EBlockchain } from 'multirpc-sdk';
import { Typography } from '@mui/material';

import { ECurrency, IFeeDetails } from 'modules/billing/types';
import { renderCryptoFee } from 'modules/billing/utils/renderCryptoFee';
import { renderPaymentSummaryAmount } from 'modules/billing/utils/renderPaymentSummaryAmount';

import { useDetailedAmountStyles } from './useDetailedAmountStyles';

export interface IDetailedAmountProps {
  amount: number;
  className?: string;
  currency: ECurrency;
  feeDetails: IFeeDetails;
  network: EBlockchain;
}

export const DetailedAmount = ({
  amount,
  className,
  currency,
  feeDetails: { feeCrypto },
  network,
}: IDetailedAmountProps) => {
  const amountString = renderPaymentSummaryAmount({ amount, currency });
  const fee = renderCryptoFee({ fee: feeCrypto, network });

  const { classes, cx } = useDetailedAmountStyles();

  return (
    <Typography className={cx(classes.root, className)} variant="body3">
      {amountString} + {fee}
    </Typography>
  );
};

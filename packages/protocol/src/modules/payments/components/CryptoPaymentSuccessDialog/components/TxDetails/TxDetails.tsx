import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { EPaymentType, IFeeDetails } from 'modules/payments/types';
import { FeeAmount } from 'modules/payments/components/FeeAmount';
import {
  ITotalAmountAttributeProps,
  TotalAmountAttribute,
} from 'modules/payments/components/TotalAmountAttribute';
import { SeparatedList } from 'modules/payments/components/SeparatedList';
import { TxAttribute } from 'modules/payments/components/TxAttribute';
import { renderCryptoAmount } from 'modules/payments/utils/renderCryptoAmount';

import { AllowanceAtrribute } from './components/AllowanceAtrribute';
import { AmountLabel } from './components/AmountLabel';
import { useTxDetailsStyles } from './useTxDetailsStyles';

type TAllowanceFields = 'allowanceFee' | 'allowanceFeeUSD';

export interface ITxDetailsProps
  extends Omit<ITotalAmountAttributeProps, TAllowanceFields> {
  allowanceFeeDetails?: IFeeDetails;
  allowanceTxURL?: string;
  depositTxURL: string;
  paymentType: EPaymentType;
}

export const TxDetails = ({
  allowanceFeeDetails,
  allowanceTxURL,
  amount,
  amountUsd,
  currency,
  depositFee,
  depositFeeUSD,
  depositTxURL,
  network,
  paymentType,
}: ITxDetailsProps) => {
  const { classes } = useTxDetailsStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="subtitle2">
        {t('account.success-crypto-payment-dialog.transaction-title')}
      </Typography>
      <SeparatedList>
        <TxAttribute label={<AmountLabel paymentType={paymentType} />}>
          {renderCryptoAmount({ amount, currency })}
        </TxAttribute>
        {allowanceFeeDetails && (
          <AllowanceAtrribute
            feeDetails={allowanceFeeDetails}
            network={network}
            txURL={allowanceTxURL}
          />
        )}
        <TxAttribute
          label={t('account.success-crypto-payment-dialog.deposit-label')}
        >
          <FeeAmount
            feeCrypto={depositFee}
            feeUSD={depositFeeUSD}
            network={network}
            txURL={depositTxURL}
          />
        </TxAttribute>
        <TotalAmountAttribute
          allowanceFee={allowanceFeeDetails?.feeCrypto}
          allowanceFeeUSD={allowanceFeeDetails?.feeUSD}
          amount={amount}
          amountUsd={amountUsd}
          currency={currency}
          depositFee={depositFee}
          depositFeeUSD={depositFeeUSD}
          network={network}
        />
      </SeparatedList>
    </div>
  );
};

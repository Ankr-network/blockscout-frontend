import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { EPaymentType, IFeeDetails } from 'modules/billing/types';
import { FeeAmount } from 'modules/billing/components/FeeAmount';
import {
  ITotalAmountAttributeProps,
  TotalAmountAttribute,
} from 'modules/billing/components/TotalAmountAttribute';
import { SeparatedList } from 'modules/billing/components/SeparatedList';
import { TxAttribute } from 'modules/billing/components/TxAttribute';
import { renderCryptoAmount } from 'modules/billing/utils/renderCryptoAmount';

import { ApprovalAtrribute } from './components/ApprovalAttribute';
import { renderAmountLabel } from './utils/renderAmountLabel';
import { useTxDetailsStyles } from './useTxDetailsStyles';

type TApprovalFields = 'approvalFee' | 'approvalFeeUSD' | 'approvalTxURL';

export interface ITxDetailsProps
  extends Omit<ITotalAmountAttributeProps, TApprovalFields> {
  approvalFeeDetails?: IFeeDetails;
  depositTxURL: string;
  paymentType: EPaymentType;
}

export const TxDetails = ({
  amount,
  amountUsd,
  approvalFeeDetails,
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
        <TxAttribute label={renderAmountLabel(paymentType)}>
          {renderCryptoAmount({ amount, currency })}
        </TxAttribute>
        {approvalFeeDetails && (
          <ApprovalAtrribute
            feeDetails={approvalFeeDetails}
            network={network}
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
          amount={amount}
          amountUsd={amountUsd}
          approvalFee={approvalFeeDetails?.feeCrypto}
          approvalFeeUSD={approvalFeeDetails?.feeUSD}
          currency={currency}
          depositFee={depositFee}
          depositFeeUSD={depositFeeUSD}
          network={network}
        />
      </SeparatedList>
    </div>
  );
};

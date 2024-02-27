import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { EPaymentType } from 'modules/billing/types';
import { SeparatedList } from 'modules/billing/components/SeparatedList';
import { renderCryptoAmount } from 'modules/billing/utils/renderCryptoAmount';

import { ApprovalAtrribute } from './components/ApprovalAttribute';
import { FeeAmount } from './components/FeeAmount';
import { IApprovalDetails } from '../../types';
import {
  ITotalAmountAttributeProps,
  TotalAmountAttribute,
} from './components/TotalAmountAttribute';
import { TxAttribute } from './components/TxAttribute';
import { renderAmountLabel } from './utils/renderAmountLabel';
import { useTxDetailsStyles } from './useTxDetailsStyles';

type TApprovalFields = 'approvalFee' | 'approvalFeeUSD' | 'approvalTxURL';

export interface ITxDetailsProps
  extends Omit<ITotalAmountAttributeProps, TApprovalFields> {
  approval?: IApprovalDetails;
  depositTxURL: string;
  paymentType: EPaymentType;
}

export const TxDetails = ({
  amount,
  amountUSD,
  approval,
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
        {approval && (
          <ApprovalAtrribute approval={approval} network={network} />
        )}
        <TxAttribute
          label={t('account.success-crypto-payment-dialog.deposit-label')}
        >
          <FeeAmount
            fee={depositFee}
            feeUSD={depositFeeUSD}
            network={network}
            txURL={depositTxURL}
          />
        </TxAttribute>
        <TotalAmountAttribute
          amount={amount}
          amountUSD={amountUSD}
          approvalFee={approval?.fee}
          approvalFeeUSD={approval?.feeUSD}
          currency={currency}
          depositFee={depositFee}
          depositFeeUSD={depositFeeUSD}
          network={network}
        />
      </SeparatedList>
    </div>
  );
};

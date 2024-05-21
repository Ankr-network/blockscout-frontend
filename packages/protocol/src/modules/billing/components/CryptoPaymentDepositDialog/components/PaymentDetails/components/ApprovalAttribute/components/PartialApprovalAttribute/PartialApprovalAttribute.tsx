import { t } from '@ankr.com/common';
import { EBlockchain } from 'multirpc-sdk';

import { Alert } from 'modules/billing/components/CryptoPaymentDepositDialog/components/PaymentDetails/components/Alert';
import { ECryptoDepositStepStatus, ECurrency } from 'modules/billing/types';
import { FeeAmount } from 'modules/billing/components/FeeAmount';
import { Label } from 'modules/billing/components/CryptoPaymentDepositDialog/components/PaymentDetails/components/Label';
import { TxAttribute } from 'modules/billing/components/TxAttribute';
import { renderCryptoAmount } from 'modules/billing/utils/renderCryptoAmount';

import { useAlertProps } from './utils/useAlertProps';
import { usePartialApprovalAttributeStyles } from './usePartialApprovalAttributeStyles';

export interface IPartialApprovalAttributeProps {
  amount: number;
  approvedAmount?: number;
  currency: ECurrency;
  error?: string;
  feeCrypto: number;
  feeUSD: number;
  network: EBlockchain;
  shouldHideAlert: boolean;
  status?: ECryptoDepositStepStatus;
}

const labelKey = 'account.payment-flow.steps.approval.title';

export const PartialApprovalAttribute = ({
  amount,
  approvedAmount = 0,
  currency,
  error,
  feeCrypto,
  feeUSD,
  network,
  shouldHideAlert,
  status,
}: IPartialApprovalAttributeProps) => {
  const { classes } = usePartialApprovalAttributeStyles();

  const amountToDeposit = renderCryptoAmount({
    amount,
    currency,
  });

  const approvedAmountString = renderCryptoAmount({
    amount: approvedAmount,
    currency,
  });

  const alertProps = useAlertProps({
    amountToDeposit,
    approvedAmount,
    approvedAmountString,
    hasEnoughApproval: approvedAmount >= amount,
    currency,
    error,
    status,
  });

  return (
    <TxAttribute
      classes={classes}
      label={<Label status={status} text={t(labelKey)} />}
      extraContent={!shouldHideAlert && <Alert {...alertProps} />}
    >
      <FeeAmount
        feeCrypto={feeCrypto}
        feeUSD={feeUSD}
        isApproximate
        network={network}
      />
    </TxAttribute>
  );
};

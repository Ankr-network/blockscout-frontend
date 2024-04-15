import { t } from '@ankr.com/common';

import { Alert } from 'modules/billing/components/CryptoPaymentDepositDialog/components/PaymentDetails/components/Alert';
import { ECryptoDepositStepStatus, ENetwork } from 'modules/billing/types';
import { FeeAmount } from 'modules/billing/components/FeeAmount';
import { Label } from 'modules/billing/components/CryptoPaymentDepositDialog/components/PaymentDetails/components/Label';
import { TxAttribute } from 'modules/billing/components/TxAttribute';

import { getAlertProps } from './utils/getAlertProps';

export interface INoApprovalAttributeProps {
  error?: string;
  feeCrypto: number;
  feeUSD: number;
  network: ENetwork;
  status?: ECryptoDepositStepStatus;
}

const labelKey = 'account.payment-flow.steps.approval.title';

export const NoApprovalAttribute = ({
  error,
  feeCrypto,
  feeUSD,
  network,
  status,
}: INoApprovalAttributeProps) => {
  const alertProps = getAlertProps({ error, status });

  const label = <Label status={status} text={t(labelKey)} />;
  const extraContent = alertProps && <Alert {...alertProps} />;

  return (
    <TxAttribute extraContent={extraContent} label={label}>
      <FeeAmount
        feeCrypto={feeCrypto}
        feeUSD={feeUSD}
        isApproximate
        network={network}
      />
    </TxAttribute>
  );
};

import { EBlockchain } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { Alert } from 'modules/payments/components/Alert';
import { ECryptoDepositStepStatus } from 'modules/payments/types';
import { FeeAmount } from 'modules/payments/components/FeeAmount';
import { Label } from 'modules/payments/components/Label';
import { TxAttribute } from 'modules/payments/components/TxAttribute';

import { getAlertProps } from './utils/getAlertProps';

export interface INoAllowanceAttributeProps {
  error?: string;
  feeCrypto: number;
  feeUSD: number;
  network: EBlockchain;
  status?: ECryptoDepositStepStatus;
  txURL?: string;
}

const labelKey = 'account.payment-flow.steps.approval.title';

export const NoAllowanceAttribute = ({
  error,
  feeCrypto,
  feeUSD,
  network,
  txURL,
  status,
}: INoAllowanceAttributeProps) => {
  const alertProps = getAlertProps({ error, status });

  const label = <Label status={status} text={t(labelKey)} />;
  const extraContent = alertProps && <Alert {...alertProps} />;

  return (
    <TxAttribute extraContent={extraContent} label={label}>
      <FeeAmount
        feeCrypto={feeCrypto}
        feeUSD={feeUSD}
        isApproximate
        txURL={txURL}
        network={network}
      />
    </TxAttribute>
  );
};

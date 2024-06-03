import { EBlockchain } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { Alert } from 'modules/payments/components/Alert';
import { ECryptoDepositStepStatus, IFeeDetails } from 'modules/payments/types';
import { FeeAmount } from 'modules/payments/components/FeeAmount';
import { Label } from 'modules/payments/components/Label';
import { TxAttribute } from 'modules/payments/components/TxAttribute';

import { getAlertProps } from './utils/getAlertProps';
import { useDepositAttributeStyles } from './useDepositAttributeStyles';

export interface IDepositAttributeProps {
  error?: string;
  feeDetails: IFeeDetails;
  network: EBlockchain;
  status?: ECryptoDepositStepStatus;
}

const labelKey = 'account.payment-flow.steps.deposit.title';

export const DepositAttribute = ({
  error,
  feeDetails: { feeCrypto, feeUSD },
  network,
  status,
}: IDepositAttributeProps) => {
  const { classes } = useDepositAttributeStyles();

  const alertProps = getAlertProps({ error, status });

  const label = <Label status={status} text={t(labelKey)} />;
  const extraContent = alertProps && <Alert {...alertProps} />;

  return (
    <TxAttribute classes={classes} extraContent={extraContent} label={label}>
      <FeeAmount
        feeCrypto={feeCrypto}
        feeUSD={feeUSD}
        isApproximate
        network={network}
      />
    </TxAttribute>
  );
};

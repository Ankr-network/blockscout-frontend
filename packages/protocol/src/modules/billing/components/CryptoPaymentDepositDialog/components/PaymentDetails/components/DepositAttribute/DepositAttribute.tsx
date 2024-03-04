import { t } from '@ankr.com/common';

import {
  ECryptoDepositStepStatus,
  ENetwork,
  IFeeDetails,
} from 'modules/billing/types';
import { FeeAmount } from 'modules/billing/components/FeeAmount';
import { TxAttribute } from 'modules/billing/components/TxAttribute';

import { Alert } from '../Alert';
import { Label } from '../Label';
import { getAlertProps } from './utils/getAlertProps';
import { useDepositAttributeStyles } from './useDepositAttributeStyles';

export interface IDepositAttributeProps {
  error?: string;
  feeDetails: IFeeDetails;
  network: ENetwork;
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

import { EBlockchain } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { Alert } from 'modules/payments/components/Alert';
import { ECryptoDepositStepStatus, ECurrency } from 'modules/payments/types';
import { FeeAmount } from 'modules/payments/components/FeeAmount';
import { Label } from 'modules/payments/components/Label';
import { TxAttribute } from 'modules/payments/components/TxAttribute';
import { renderCryptoAmount } from 'modules/payments/utils/renderCryptoAmount';

import { useAlert } from './hooks/useAlert';
import { usePartialAllowanceAttributeStyles } from './usePartialAllowanceAttributeStyles';

export interface IPartialAllowanceAttributeProps {
  allowance?: number;
  amount: number;
  currency: ECurrency;
  error?: string;
  feeCrypto: number;
  feeUSD: number;
  network: EBlockchain;
  shouldHideAlert: boolean;
  status?: ECryptoDepositStepStatus;
  txURL?: string;
}

const labelKey = 'account.payment-flow.steps.approval.title';

export const PartialAllowanceAttribute = ({
  allowance = 0,
  amount,
  currency,
  error,
  feeCrypto,
  feeUSD,
  network,
  shouldHideAlert,
  status,
  txURL,
}: IPartialAllowanceAttributeProps) => {
  const { classes } = usePartialAllowanceAttributeStyles();

  const amountString = renderCryptoAmount({ amount, currency });

  const allowanceString = renderCryptoAmount({ amount: allowance, currency });

  const alertProps = useAlert({
    allowanceString,
    amountString,
    currency,
    error,
    hasEnoughAllowance: allowance >= amount,
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
        txURL={txURL}
      />
    </TxAttribute>
  );
};

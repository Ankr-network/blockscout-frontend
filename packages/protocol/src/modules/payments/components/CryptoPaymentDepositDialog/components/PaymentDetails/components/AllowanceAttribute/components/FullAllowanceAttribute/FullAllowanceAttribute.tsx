import { t } from '@ankr.com/common';

import { Alert } from 'modules/payments/components/Alert';
import { ECryptoDepositStepStatus, ECurrency } from 'modules/payments/types';
import { Label } from 'modules/payments/components/Label';
import { TxAttribute } from 'modules/payments/components/TxAttribute';
import { renderCryptoAmount } from 'modules/payments/utils/renderCryptoAmount';

import { useFullAllowanceAttributeStyles } from './useFullAllowanceAttributeStyles';

export interface IFullAllowanceAttributeProps {
  allowance: number;
  currency: ECurrency;
  shouldHideAlert: boolean;
}

const alertKey = 'account.payment-flow.steps.approval.full-approval-alert';
const labelKey = 'account.payment-flow.steps.approval.title';

const { Complete } = ECryptoDepositStepStatus;

export const FullAllowanceAttribute = ({
  allowance,
  currency,
  shouldHideAlert,
}: IFullAllowanceAttributeProps) => {
  const { classes } = useFullAllowanceAttributeStyles();

  const approvedAmount = renderCryptoAmount({ amount: allowance, currency });

  const alertText = t(alertKey, { approvedAmount });

  return (
    <TxAttribute
      classes={classes}
      label={<Label status={Complete} text={t(labelKey)} />}
      extraContent={
        !shouldHideAlert && <Alert severity="info" text={alertText} />
      }
    >
      –
    </TxAttribute>
  );
};

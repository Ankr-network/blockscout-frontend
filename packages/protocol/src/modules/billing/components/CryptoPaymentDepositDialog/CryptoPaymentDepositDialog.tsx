import { t } from '@ankr.com/common';

import { Dialog, IDialogProps } from 'uiKit/Dialog';
import {
  ECryptoDepositStep,
  ECryptoDepositStepStatus,
} from 'modules/billing/types';

import { Buttons } from './components/Buttons';
import { Header } from './components/Header';
import { IUseCryptoPaymentDepositDialogProps } from './types';
import { PaymentDetails } from './components/PaymentDetails';
import { Stepper } from './components/Stepper';
import { useCryptoPaymentDepositDialogStyles } from './useCryptoPaymentDepositDialogStyles';

export interface ICryptoPaymentDepositDialogProps
  extends IDialogProps,
    IUseCryptoPaymentDepositDialogProps {}

export const CryptoPaymentDepositDialog = ({
  amount,
  amountUSD,
  currency,
  step,
  network,
  ...dialogProps
}: ICryptoPaymentDepositDialogProps) => {
  const { classes } = useCryptoPaymentDepositDialogStyles();

  return (
    <Dialog
      {...dialogProps}
      classes={classes}
      title={t('account.crypto-payment-deposit-dialog.title')}
      titleClassName={classes.title}
      hasMinimizeIcon
    >
      <Header amount={amount} amountUSD={amountUSD} currency={currency} />
      <Stepper className={classes.stepper} activeStep={step} />
      <PaymentDetails
        // approvedAmount={10000}
        amount={amount}
        approvalFeeDetails={{ feeCrypto: 0.00489, feeUSD: 5.88 }}
        approvalStatus={ECryptoDepositStepStatus.Error}
        className={classes.paymentDetails}
        currency={currency}
        depositError="errororor"
        depositFeeDetails={{ feeCrypto: 0.00489, feeUSD: 5 }}
        depositStatus={ECryptoDepositStepStatus.Confirmation}
        network={network}
      />
      <Buttons
        activeStep={ECryptoDepositStep.Deposit}
        isPending={false}
        onConfirmButtonClick={() => {}}
        onDiscardButtonClick={() => {}}
        status={ECryptoDepositStepStatus.Error}
      />
    </Dialog>
  );
};

import { t } from '@ankr.com/common';

import { Dialog } from 'uiKit/Dialog';

import { Buttons } from './components/Buttons';
import { Header } from './components/Header';
import { ICryptoPaymentDepositDialogProps } from './types';
import { PaymentDetails } from './components/PaymentDetails';
import { Stepper } from './components/Stepper';
import { useCryptoPaymentDepositDialogStyles } from './useCryptoPaymentDepositDialogStyles';
import { SwitchNetworkBanner } from './components/SwitchNetworkBanner';

export const CryptoPaymentDepositDialog = ({
  amount,
  amountUsd,
  amountToDeposit,
  currency,
  network,
  isWrongNetwork,
  shouldRevokeApproval,
  onCheckApproval,

  /* IPaymentDetailsProps */
  approvalError,
  approvalFeeDetails,
  approvalStatus,
  depositError,
  depositFeeDetails,
  depositStatus,
  isAllowanceSent,
  isMyAllowanceLoading,
  myAllowance,

  /* IButtonsProps */
  activeStep,
  isPending,
  onConfirmButtonClick,
  onDiscardButtonClick,
  status,

  /* IStepperProps */
  completedStep,
  erroredStep,

  // TODO: should be removed https://ankrnetwork.atlassian.net/browse/MRPC-4736
  onOpen,

  ...dialogProps
}: ICryptoPaymentDepositDialogProps) => {
  const { classes } = useCryptoPaymentDepositDialogStyles();

  return (
    <Dialog
      {...dialogProps}
      classes={classes}
      title={t('account.crypto-payment-deposit-dialog.title')}
      titleClassName={classes.title}
    >
      <Header
        amount={Number(amountToDeposit)}
        amountUsd={amountUsd}
        currency={currency}
        network={network}
      />
      <Stepper
        className={classes.stepper}
        activeStep={activeStep}
        completedStep={completedStep}
        erroredStep={erroredStep}
      />
      <PaymentDetails
        amount={amount}
        approvalError={approvalError}
        approvalFeeDetails={approvalFeeDetails}
        approvalStatus={approvalStatus}
        className={classes.paymentDetails}
        currency={currency}
        depositError={depositError}
        depositFeeDetails={depositFeeDetails}
        depositStatus={depositStatus}
        isAllowanceSent={isAllowanceSent}
        isMyAllowanceLoading={isMyAllowanceLoading}
        myAllowance={myAllowance}
        network={network}
      />
      {isWrongNetwork && <SwitchNetworkBanner network={network} />}
      <Buttons
        activeStep={activeStep}
        isPending={isPending}
        onConfirmButtonClick={onConfirmButtonClick}
        onDiscardButtonClick={onDiscardButtonClick}
        status={status}
        isWrongNetwork={isWrongNetwork}
        shouldRevokeApproval={shouldRevokeApproval}
        isRevokeApprovalLoading={isMyAllowanceLoading}
        onCheckApproval={onCheckApproval}
      />
    </Dialog>
  );
};

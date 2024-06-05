import { t } from '@ankr.com/common';

import { Dialog } from 'uiKit/Dialog';
import {
  ECryptoDepositStep,
  ECryptoDepositStepStatus,
} from 'modules/billing/types';

import { Buttons } from './components/Buttons';
import { Header } from './components/Header';
import { ICryptoPaymentDepositDialogProps } from './types';
import { PaymentDetails } from './components/PaymentDetails';
import { Stepper } from './components/Stepper';
import { SwitchNetworkBanner } from './components/SwitchNetworkBanner';
import { useCryptoPaymentDepositDialogStyles } from './useCryptoPaymentDepositDialogStyles';

export const CryptoPaymentDepositDialog = ({
  activeStep,
  amount,
  amountToDeposit,
  amountUsd,
  approvalError,
  approvalFeeDetails,
  approvalStatus,
  completedStep,
  currency,
  depositError,
  depositFeeDetails,
  depositStatus,
  erroredStep,
  isAllowanceSent,
  isMyAllowanceLoading,
  isPending,
  isConfirmationBlocksWaiting,
  isWrongNetwork,
  myAllowance,
  network,
  onCheckApproval,
  onConfirmButtonClick,
  onDiscardButtonClick,
  // TODO: should be removed https://ankrnetwork.atlassian.net/browse/MRPC-4736
  onOpen,
  shouldRevokeApproval,
  status,
  ...dialogProps
}: ICryptoPaymentDepositDialogProps) => {
  const { classes } = useCryptoPaymentDepositDialogStyles();

  const isDepositPending =
    activeStep === ECryptoDepositStep.Deposit &&
    depositStatus === ECryptoDepositStepStatus.Pending;

  const isDepositWaiting =
    activeStep === ECryptoDepositStep.Deposit &&
    depositStatus === ECryptoDepositStepStatus.ConfirmationBlocksWaiting;

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
        activeStep={activeStep}
        className={classes.stepper}
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
        isDepositPending={isDepositPending}
        isDepositWaiting={isDepositWaiting}
        isMyAllowanceLoading={isMyAllowanceLoading}
        myAllowance={myAllowance}
        network={network}
      />
      {isWrongNetwork && <SwitchNetworkBanner network={network} />}
      <Buttons
        activeStep={activeStep}
        isPending={isPending}
        isConfirmationBlocksWaiting={isConfirmationBlocksWaiting}
        isRevokeApprovalLoading={isMyAllowanceLoading}
        isWrongNetwork={isWrongNetwork}
        onCheckApproval={onCheckApproval}
        onConfirmButtonClick={onConfirmButtonClick}
        onDiscardButtonClick={onDiscardButtonClick}
        shouldRevokeApproval={shouldRevokeApproval}
        status={status}
      />
    </Dialog>
  );
};

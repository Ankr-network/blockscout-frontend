import {
  ECryptoDepositStep,
  ECryptoDepositStepStatus,
} from 'modules/billing/types';

import { ConfirmButton } from '../ConfirmButton';
import { DiscardButton } from '../DiscardButton';
import { useButtonsStyles } from './useButtonsStyles';
import { RevokeApprovalButtons } from '../RevokeApprovalButtons';

export interface IButtonsProps {
  activeStep: ECryptoDepositStep;
  isPending: boolean;
  isConfirmationBlocksWaiting: boolean;
  isRevokeApprovalLoading: boolean;
  onConfirmButtonClick: () => void;
  onDiscardButtonClick: () => void;
  onCheckApproval: () => void;
  status: ECryptoDepositStepStatus;
  isWrongNetwork: boolean;
  shouldRevokeApproval: boolean;
}

export const Buttons = ({
  activeStep,
  isPending,
  isConfirmationBlocksWaiting,
  isRevokeApprovalLoading,
  onConfirmButtonClick,
  onDiscardButtonClick,
  onCheckApproval,
  status,
  isWrongNetwork,
  shouldRevokeApproval,
}: IButtonsProps) => {
  const isDepositStep = activeStep === ECryptoDepositStep.Deposit;
  const hasError = status === ECryptoDepositStepStatus.Error;
  const hasDiscardButton = isDepositStep && hasError;

  const { classes } = useButtonsStyles();

  if (shouldRevokeApproval) {
    return (
      <RevokeApprovalButtons
        isLoading={isRevokeApprovalLoading}
        onCheckApproval={onCheckApproval}
        onDiscardButtonClick={onDiscardButtonClick}
      />
    );
  }

  return (
    <div className={classes.root}>
      <ConfirmButton
        activeStep={activeStep}
        isPending={isPending}
        onClick={onConfirmButtonClick}
        status={status}
        isWrongNetwork={isWrongNetwork}
        isConfirmationBlocksWaiting={isConfirmationBlocksWaiting}
      />
      {hasDiscardButton && <DiscardButton onClick={onDiscardButtonClick} />}
    </div>
  );
};

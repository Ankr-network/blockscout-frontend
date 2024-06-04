import {
  ECryptoDepositStep,
  ECryptoDepositStepStatus,
} from 'modules/payments/types';

import { ConfirmButton } from '../ConfirmButton';
import { DiscardButton } from '../DiscardButton';
import { RevokeAllowanceButtons } from '../RevokeAllowanceButtons';
import { useButtonsStyles } from './useButtonsStyles';

export interface IButtonsProps {
  activeStep: ECryptoDepositStep;
  isPending: boolean;
  isRevokeAllowanceLoading: boolean;
  isWrongNetwork: boolean;
  onCheckAllowanceButtonClick: () => void;
  onConfirmButtonClick: () => void;
  onDiscardButtonClick: () => void;
  shouldRevokeAllowance: boolean;
  status: ECryptoDepositStepStatus;
}

export const Buttons = ({
  activeStep,
  isPending,
  isRevokeAllowanceLoading,
  isWrongNetwork,
  onCheckAllowanceButtonClick,
  onConfirmButtonClick,
  onDiscardButtonClick,
  shouldRevokeAllowance,
  status,
}: IButtonsProps) => {
  const isDepositStep = activeStep === ECryptoDepositStep.Deposit;
  const hasError = status === ECryptoDepositStepStatus.Error;
  const hasDiscardButton = isDepositStep && hasError;

  const { classes } = useButtonsStyles();

  if (shouldRevokeAllowance) {
    return (
      <RevokeAllowanceButtons
        isLoading={isRevokeAllowanceLoading}
        onCheckAllowanceButtonClick={onCheckAllowanceButtonClick}
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
      />
      {hasDiscardButton && <DiscardButton onClick={onDiscardButtonClick} />}
    </div>
  );
};

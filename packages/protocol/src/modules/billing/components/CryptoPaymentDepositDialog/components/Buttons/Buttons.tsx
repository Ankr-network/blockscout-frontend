import {
  ECryptoDepositStep,
  ECryptoDepositStepStatus,
} from 'modules/billing/types';

import { ConfirmButton } from '../ConfirmButton';
import { DiscardButton } from '../DiscardButton';
import { useButtonsStyles } from './useButtonsStyles';

export interface IButtonsProps {
  activeStep: ECryptoDepositStep;
  isPending: boolean;
  onConfirmButtonClick: () => void;
  onDiscardButtonClick: () => void;
  status: ECryptoDepositStepStatus;
}

export const Buttons = ({
  activeStep,
  isPending,
  onConfirmButtonClick,
  onDiscardButtonClick,
  status,
}: IButtonsProps) => {
  const isDepositStep = activeStep === ECryptoDepositStep.Deposit;
  const hasError = status === ECryptoDepositStepStatus.Error;
  const hasDiscardButton = isDepositStep && hasError;

  const { classes } = useButtonsStyles();

  return (
    <div className={classes.root}>
      <ConfirmButton
        activeStep={activeStep}
        isPending={isPending}
        onClick={onConfirmButtonClick}
        status={status}
      />
      {hasDiscardButton && <DiscardButton onClick={onDiscardButtonClick} />}
    </div>
  );
};

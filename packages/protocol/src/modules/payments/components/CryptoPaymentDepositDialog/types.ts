import { IDialogProps } from 'uiKit/Dialog';

import { IButtonsProps } from './components/Buttons';
import { IPaymentDetailsProps } from './components/PaymentDetails';
import { IStepperProps } from './components/Stepper';

export interface ICryptoPaymentDepositDialogProps
  extends Omit<
      IPaymentDetailsProps,
      'isDepositPending' | 'isDepositConfirming'
    >,
    Omit<IStepperProps, 'className'>,
    Omit<IButtonsProps, 'isRevokeAllowanceLoading' | 'isDepositConfirming'>,
    IDialogProps {
  amountUsd: number;
}

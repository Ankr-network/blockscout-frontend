import { IDialogProps } from 'uiKit/Dialog';

import { IPaymentDetailsProps } from './components/PaymentDetails';
import { IStepperProps } from './components/Stepper';
import { IButtonsProps } from './components/Buttons';

export interface ICryptoPaymentDepositDialogProps
  extends IPaymentDetailsProps,
    IStepperProps,
    IButtonsProps,
    IDialogProps {
  onOpen: () => void;
  amountUsd: number;
}

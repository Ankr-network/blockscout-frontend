import BigNumber from 'bignumber.js';

import { IDialogProps } from 'uiKit/Dialog';

import { IPaymentDetailsProps } from './components/PaymentDetails';
import { IStepperProps } from './components/Stepper';
import { IButtonsProps } from './components/Buttons';

export interface ICryptoPaymentDepositDialogProps
  extends Omit<IPaymentDetailsProps, 'isDepositPending'>,
    IStepperProps,
    IButtonsProps,
    IDialogProps {
  amountToDeposit: BigNumber;
  amountUsd: number;
  onOpen: () => void;
}

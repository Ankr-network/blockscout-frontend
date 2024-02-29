import { TrackTopUpSubmit } from 'domains/account/types';

export enum AmountInputField {
  amount = 'amount',
}

export interface TopUpFormValues {
  [AmountInputField.amount]: string;
}

type ValidateAmount = (amount: string) => string | undefined;

export interface AnkrTopUpFormContainerProps {
  initialValues: TopUpFormValues;
  trackSubmit?: TrackTopUpSubmit;
  validateAmount?: ValidateAmount;
}

export interface TopUpFormProps
  extends Omit<AnkrTopUpFormContainerProps, 'trackSubmit'> {
  hasLoginStep: boolean;
  isLoggedIn: boolean;
  onSubmit: (data: TopUpFormValues) => void;
  trackSubmit?: TrackTopUpSubmit;
}

import { TrackTopUpSubmit } from 'domains/account/types';

export enum AmountInputField {
  amount = 'amount',
  id = 'id',
}

export interface TopUpFormValues {
  [AmountInputField.amount]: string;
  [AmountInputField.id]?: string;
}

export interface TopUpFormProps {
  isLoading: boolean;
  onSubmit: (data: TopUpFormValues) => void;
  shouldUseDefaultValue: boolean;
  trackSubmit?: TrackTopUpSubmit;
}

export enum AmountInputField {
  amount = 'amount',
}

export interface TopUpFormValues {
  [AmountInputField.amount]: string;
}

export interface TopUpFormProps {
  onSubmit: (data: TopUpFormValues) => void;
  isLoading: boolean;
  isDisabled: boolean;
  hasRateBlock?: boolean;
}

export enum AmountInputField {
  amount = 'amount',
  id = 'id',
}

export interface TopUpFormValues {
  [AmountInputField.amount]: string;
  [AmountInputField.id]?: string;
}

export interface TopUpFormProps {
  onSubmit: (data: TopUpFormValues) => void;
  isLoading: boolean;
  shouldUseDefaultValue: boolean;
  hasRateBlock?: boolean;
}

export enum AmountInputField {
  amount = 'amount',
}

export interface WithdrawFormValues {
  [AmountInputField.amount]: number;
}

export interface WithdrawFormProps {
  onSubmit: (data: WithdrawFormValues) => void;
}

export enum WithdrawFormFields {
  amount = 'amount',
}

export interface WithdrawFormValues {
  [WithdrawFormFields.amount]: number;
}

export interface WithdrawFormProps {
  onSubmit: (data: WithdrawFormValues) => void;
}

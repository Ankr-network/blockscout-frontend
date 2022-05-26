export enum TopUpFormFields {
  amount = 'amount',
}

export interface TopUpFormValues {
  [TopUpFormFields.amount]: number;
}

export interface TopUpFormProps {
  onSubmit: (data: TopUpFormValues) => void;
}

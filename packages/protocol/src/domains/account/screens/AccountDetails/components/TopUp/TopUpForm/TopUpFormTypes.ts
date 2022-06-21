export enum TopUpFormFields {
  amount = 'amount',
}

export interface TopUpFormValues {
  [TopUpFormFields.amount]: string;
}

export interface TopUpFormProps {
  onSubmit: (data: TopUpFormValues) => void;
  hasLoginStep: boolean;
}

import BigNumber from 'bignumber.js';

export enum AmountInputField {
  amount = 'amount',
}

export interface TopUpFormValues {
  [AmountInputField.amount]: string;
}

type ValidateAmount = (
  amount: string,
  shouldValidateMinValue: boolean,
  ankrBalance?: BigNumber,
) => string | undefined;

export interface AnkrTopUpFormContainerProps {
  initialValues: TopUpFormValues;
  validateAmount?: ValidateAmount;
}

export interface TopUpFormProps extends AnkrTopUpFormContainerProps {
  onSubmit: (data: TopUpFormValues) => void;
  hasLoginStep: boolean;
  isWalletConnected: boolean;
}

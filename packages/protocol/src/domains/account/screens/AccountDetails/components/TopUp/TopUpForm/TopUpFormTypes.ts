import BigNumber from 'bignumber.js';

export enum AmountInputField {
  amount = 'amount',
}

export interface TopUpFormValues {
  [AmountInputField.amount]: string;
  balance?: BigNumber;
}

export interface ITopUpFormContext {
  initialValues: TopUpFormValues;
  validateAmount?: (
    amount: string,
    allValues?: any,
    balance?: BigNumber,
  ) => string | undefined;
  isAccountPage: boolean;
  balance?: BigNumber;
}

export interface TopUpFormProps extends ITopUpFormContext {
  onSubmit: (data: TopUpFormValues) => void;
  hasLoginStep: boolean;
  isWalletConnected: boolean;
}

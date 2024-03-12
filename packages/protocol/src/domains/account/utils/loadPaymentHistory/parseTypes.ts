import { PaymentType } from 'domains/account/types';

export interface ParcedTypes {
  dealOnly: boolean;
  deductionsOnly: boolean;
  depositOnly: boolean;
  withDeductions: boolean;
}

export const parseTypes = (types: PaymentType[] = []): ParcedTypes => {
  const withDeductions =
    types.length === 0 || types.includes('TRANSACTION_TYPE_DEDUCTION');

  const deductionsOnly = withDeductions && types.length === 1;
  const dealOnly =
    types.length === 1 && types.includes('TRANSACTION_TYPE_DEAL_DEPOSIT');
  const depositOnly =
    types.length === 1 && types.includes('TRANSACTION_TYPE_DEPOSIT');

  return { dealOnly, deductionsOnly, depositOnly, withDeductions };
};

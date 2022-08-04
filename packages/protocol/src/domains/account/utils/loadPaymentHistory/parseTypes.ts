import { IPaymentHistoryEntityType } from 'multirpc-sdk';

export interface ParcedTypes {
  deductionsOnly: boolean;
  withDeductions: boolean;
}

export const parseTypes = (
  types: IPaymentHistoryEntityType[] = [],
): ParcedTypes => {
  const withDeductions =
    types.length === 0 || types.includes('TRANSACTION_TYPE_DEDUCTION');

  const deductionsOnly = withDeductions && types.length === 1;

  return { deductionsOnly, withDeductions };
};

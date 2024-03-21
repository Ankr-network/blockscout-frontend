import { PaymentType } from 'domains/account/types';

export interface ParcedTypes {
  dealOnly: boolean;
  packageOnly: boolean;
  deductionsOnly: boolean;
  depositOnly: boolean;
  vouchersOnly: boolean;
  withDeductions: boolean;
}

export const parseTypes = (types: PaymentType[] = []): ParcedTypes => {
  const withDeductions =
    types.length === 0 || types.includes('TRANSACTION_TYPE_DEDUCTION');

  const deductionsOnly = withDeductions && types.length === 1;
  const dealOnly =
    types.length === 1 && types.includes('TRANSACTION_TYPE_DEAL_DEPOSIT');
  const packageOnly =
    types.length === 1 && types.includes('TRANSACTION_TYPE_PACKAGE_DEPOSIT');
  const depositOnly =
    types.length === 1 && types.includes('TRANSACTION_TYPE_DEPOSIT');
  const vouchersOnly =
    types.length === 2 &&
    types.includes('TRANSACTION_TYPE_VOUCHER_TOPUP') &&
    types.includes('TRANSACTION_TYPE_VOUCHER_ADJUST');

  return {
    dealOnly,
    deductionsOnly,
    depositOnly,
    packageOnly,
    vouchersOnly,
    withDeductions,
  };
};

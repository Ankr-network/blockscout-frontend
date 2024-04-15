import { ECurrency, ENetwork, IFeeDetails } from 'modules/billing/types';

export interface ICryptoPaymentSummaryDialogCommonProps {
  amount: number;
  approvalFeeDetails: IFeeDetails;
  currency: ECurrency;
  depositFeeDetails: IFeeDetails;
  hasEnoughTokenBalance: boolean;
  isAccountChangedOnDepositStep: boolean;
  isWalletTokenBalanceLoading: boolean;
  network: ENetwork;
  totalAmount: number;
}

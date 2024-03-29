import { ECurrency, ENetwork, IFeeDetails } from 'modules/billing/types';

export interface IUseCryptoPaymentSummaryDialogProps {
  amount: number;
  approvalFeeDetails: IFeeDetails;
  currency: ECurrency;
  depositFeeDetails: IFeeDetails;
  isLoading?: boolean;
  network: ENetwork;
  totalAmount: number;
}

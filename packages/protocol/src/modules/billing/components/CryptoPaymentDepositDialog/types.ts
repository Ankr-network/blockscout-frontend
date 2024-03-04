import { ECryptoDepositStep, ECurrency, ENetwork } from 'modules/billing/types';

export interface IUseCryptoPaymentDepositDialogProps {
  amount: number;
  amountUSD: number;
  // approval?: IApprovalDetails;
  // approvalError?: string;
  // approvedAmount?: number;
  currency: ECurrency;
  // depositError?: string;
  // depositFee: number;
  // depositFeeUSD: number;
  // isApproved: boolean;
  // isApprovind?: boolean;
  // isDepositing?: boolean;
  step: ECryptoDepositStep;
  network: ENetwork;
}

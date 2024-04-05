import {
  ECurrency,
  ENetwork,
  EPaymentType,
  IFeeDetails,
} from 'modules/billing/types';

export interface IUseCryptoPaymentSuccessDialogProps {
  amount: number;
  approval?: IFeeDetails;
  currency: ECurrency;
  network: ENetwork;
  paymentType: EPaymentType;
  txHash: string;
}

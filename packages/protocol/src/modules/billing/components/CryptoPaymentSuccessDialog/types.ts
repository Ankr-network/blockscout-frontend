import { ECurrency, ENetwork, EPaymentType } from 'modules/billing/types';

export interface IUseCryptoPaymentSuccessDialogProps {
  allowanceTxHash?: string;
  amount: number;
  currency: ECurrency;
  depositTxHash: string;
  network: ENetwork;
  paymentType: EPaymentType;
  onCloseButtonClick?: () => void;
}

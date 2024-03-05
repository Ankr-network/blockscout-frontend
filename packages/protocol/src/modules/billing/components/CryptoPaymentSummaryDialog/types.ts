import { ECurrency, ENetwork } from 'modules/billing/types';

export interface IUseCryptoPaymentSummaryDialogProps {
  amount: number;
  currency: ECurrency;
  network: ENetwork;
}

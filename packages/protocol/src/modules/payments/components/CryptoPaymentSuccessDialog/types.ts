import { EBlockchain } from 'multirpc-sdk';

import { ECurrency, EPaymentType } from 'modules/payments/types';

export interface IUseCryptoPaymentSuccessDialogProps {
  allowanceTxHash?: string;
  amount: number;
  currency: ECurrency;
  depositTxHash: string | undefined;
  network: EBlockchain;
  onClose?: () => void;
  paymentType: EPaymentType;
}

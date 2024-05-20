import { EBlockchain } from 'multirpc-sdk';

import { ECurrency, EPaymentType } from 'modules/billing/types';

export interface IUseCryptoPaymentSuccessDialogProps {
  allowanceTxHash?: string;
  amount: number;
  currency: ECurrency;
  depositTxHash: string;
  network: EBlockchain;
  onClose?: () => void;
  onOpen?: () => Promise<void>;
  paymentType: EPaymentType;
}

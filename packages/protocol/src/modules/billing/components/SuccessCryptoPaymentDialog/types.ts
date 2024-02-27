import { Web3Address } from 'multirpc-sdk';

import { ECurrency, ENetwork, EPaymentType } from 'modules/billing/types';

export interface IApprovalDetails {
  fee: number;
  feeUSD: number;
  txURL: string;
}

export interface IUseSuccessCryptoPaymentDialogProps {
  amount: number;
  amountUSD: number;
  approval?: IApprovalDetails;
  currency: ECurrency;
  depositFee: number;
  depositFeeUSD: number;
  depositTxURL: string;
  fromAddress: Web3Address;
  network: ENetwork;
  paymentType: EPaymentType;
  toAddress: Web3Address;
  txDate: Date;
}

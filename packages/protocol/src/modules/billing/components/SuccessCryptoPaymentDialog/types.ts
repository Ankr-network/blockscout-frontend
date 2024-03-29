import { Web3Address } from 'multirpc-sdk';

import {
  ECurrency,
  ENetwork,
  EPaymentType,
  IFeeDetails,
} from 'modules/billing/types';

export interface IUseSuccessCryptoPaymentDialogProps {
  amount: number;
  amountUsd: number;
  approval?: IFeeDetails;
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

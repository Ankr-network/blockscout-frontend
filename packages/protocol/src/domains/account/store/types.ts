import BigNumber from 'bignumber.js';
import { Web3Address } from 'multirpc-sdk';

import { TopUpOrigin } from '../types';

export interface ITransaction {
  allowanceTransactionHash?: string;
  amount?: BigNumber;
  amountToApprove?: BigNumber;
  approvedAmount?: BigNumber;
  isProcessing?: boolean;
  topUpTransactionHash?: string;
}

type Address = string;

export type IAccountSlice = Record<Address, ITransaction> & {
  topUpOrigin?: TopUpOrigin;
};

export interface ISetTransactionPayload extends ITransaction {
  address: Address;
}

export interface ICreateTxForDepositAddressPayload {
  authAddress: Web3Address;
  depositAddress: Web3Address;
}

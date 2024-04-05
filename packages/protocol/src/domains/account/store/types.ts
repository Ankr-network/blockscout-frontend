import BigNumber from 'bignumber.js';
import { Web3Address } from 'multirpc-sdk';

import { ECurrency } from 'modules/billing/types';

import { TopUpOrigin } from '../types';

export interface ITransaction {
  allowanceTransactionHash?: string;
  amount?: BigNumber;
  amountToDeposit?: BigNumber;
  approvedAmount?: BigNumber;
  isProcessing?: boolean;
  topUpTransactionHash?: string;
  currency?: ECurrency;
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

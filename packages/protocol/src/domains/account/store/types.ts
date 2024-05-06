import BigNumber from 'bignumber.js';
import { EBlockchain, Web3Address } from 'multirpc-sdk';

import { ECurrency } from 'modules/billing/types';

import { TopUpOrigin } from '../types';

export interface ITransaction {
  allowanceTransactionHash?: string;
  amountToDeposit?: BigNumber; // transaction amount
  amount?: BigNumber; // deprecated (it was used by topup form)
  approvedAmount?: BigNumber; // deprecated (we are fetching this amount on the flight)
  isProcessing?: boolean;
  topUpTransactionHash?: string;
  currency?: ECurrency;
  network?: EBlockchain;
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

import BigNumber from 'bignumber.js';
import { Web3Address } from 'multirpc-sdk';

import { TopUpOrigin } from '../types';

export interface ITransaction {
  allowanceTransactionHash?: string;
  amount?: BigNumber;
  approvedAmount?: BigNumber;
  topUpTransactionHash?: string;
}

type Address = string;

export type IAccountSlice = Record<Address, ITransaction> & {
  topUpOrigin?: TopUpOrigin;
};

export interface ISetTransactionPayload extends ITransaction {
  address: Address;
}

export interface ISwapTransactionPayload {
  from: Web3Address;
  to: Web3Address;
}

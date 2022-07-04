import { Web3Address } from 'multirpc-sdk';

export enum EClientType {
  Premium,
  TestPremium,
  PAYG,
}

export interface IClient {
  address: Web3Address;
  type: EClientType;
}

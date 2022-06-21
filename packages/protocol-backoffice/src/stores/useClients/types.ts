import { IBalancesEntity, ICountersEntity, Web3Address } from 'multirpc-sdk';

export type TCountersEntityWithAddress = ICountersEntity & {
  address: Web3Address;
};

export enum EClientType {
  UNKNOWN,
  PAYG,
  ForcedExpirationPremium,
  TestDrivePremium,
  Premium,
}

export type TClientEntity = IBalancesEntity & {
  type: EClientType;
  ttl?: number;
};

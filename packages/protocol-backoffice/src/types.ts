import { IBalancesEntity, ICountersEntity, Web3Address } from 'multirpc-sdk';

export type TCountersEntityWithAddress = ICountersEntity & {
  address: Web3Address;
};

export enum ClientType {
  UNKNOWN,
  PAYG,
  ForcedExpirationPremium,
  TestDrivePremium,
  Premium,
}

export type ClientEntity = IBalancesEntity & {
  type: ClientType;
  ttl?: number;
  email?: string;
};

export type PremiumPlanClientEntity = ICountersEntity & {
  type: ClientType;
  email?: string;
};

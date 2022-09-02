import {
  IBalancesEntity,
  ICountersEntityMapped,
  Web3Address,
} from 'multirpc-sdk';

export type TCountersEntityWithAddress = ICountersEntityMapped & {
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
  timestamp?: number;
  createdAt?: Date;
};

export type PremiumPlanClientEntity = ICountersEntityMapped & {
  type: ClientType;
  email?: string;
};

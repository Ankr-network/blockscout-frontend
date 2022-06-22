import { IBalancesEntity, ICountersEntity, Web3Address } from 'multirpc-sdk';
import {
  EClientType,
  TClientEntity,
  TCountersEntityWithAddress,
} from './types';

const isProtocolClient = (
  user: ICountersEntity,
): user is TCountersEntityWithAddress => 'address' in user;

export const makeClients = (
  balances: IBalancesEntity[],
  counters: ICountersEntity[],
): TClientEntity[] => {
  const clientMap: Partial<Record<Web3Address, TCountersEntityWithAddress>> =
    {};

  counters.forEach(user => {
    if (isProtocolClient(user)) clientMap[user.address] = user;
  });

  const clients: TClientEntity[] = balances.map(balance => {
    const user = clientMap[balance.address];

    if (!user) {
      return { ...balance, type: EClientType.UNKNOWN };
    }

    const { ttl } = user;

    if (!ttl)
      return { ...balance, ttl, type: EClientType.ForcedExpirationPremium };

    if (ttl <= 0) return { ...balance, ttl, type: EClientType.PAYG };

    if (ttl > 0 && user.hash)
      return { ...balance, ttl, type: EClientType.Premium };

    if (ttl > 0 && !user.hash)
      return { ...balance, ttl, type: EClientType.TestDrivePremium };

    return { ...balance, ttl, type: EClientType.UNKNOWN };
  });

  return clients;
};

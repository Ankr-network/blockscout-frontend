import { IBalancesEntity, ICountersEntity, Web3Address } from 'multirpc-sdk';
import { ClientType, ClientEntity, TCountersEntityWithAddress } from './types';

const isProtocolClient = (
  user: ICountersEntity,
): user is TCountersEntityWithAddress => 'address' in user;

export const getClientType = (ttl?: number, hash?: string) => {
  if (!ttl) {
    return ClientType.ForcedExpirationPremium;
  }

  if (ttl <= 0) {
    return ClientType.PAYG;
  }

  if (ttl > 0 && hash) {
    return ClientType.Premium;
  }

  if (ttl > 0 && !hash) {
    return ClientType.TestDrivePremium;
  }

  return ClientType.UNKNOWN;
};

export const makeClients = (
  balances: IBalancesEntity[],
  counters: ICountersEntity[],
): ClientEntity[] => {
  const clientMap: Partial<Record<Web3Address, TCountersEntityWithAddress>> =
    {};

  counters.forEach(user => {
    if (isProtocolClient(user)) clientMap[user.address] = user;
  });

  const clients: ClientEntity[] = balances.map(balance => {
    const user = clientMap[balance.address];

    if (!user) {
      return { ...balance, type: ClientType.UNKNOWN };
    }

    const { ttl, hash } = user;

    return {
      ...balance,
      ttl,
      hash,
      type: getClientType(ttl, hash),
    };
  });

  return clients;
};

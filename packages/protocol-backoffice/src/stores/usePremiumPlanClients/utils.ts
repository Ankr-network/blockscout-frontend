import { ICountersEntity } from 'multirpc-sdk';
import { getClientType } from 'stores/useClients/utils';
import { ClientType, PremiumPlanClientEntity } from 'types';

export const makeClients = (
  counters: ICountersEntity[],
): PremiumPlanClientEntity[] => {
  return counters.map(client => {
    if (!client.address) {
      return { ...client, type: ClientType.UNKNOWN };
    }

    const { ttl, hash } = client;

    return {
      ...client,
      ttl,
      hash,
      type: getClientType(ttl, hash),
    };
  });
};

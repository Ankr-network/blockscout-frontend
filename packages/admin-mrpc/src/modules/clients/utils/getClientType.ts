import { ClientType } from '../types';

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

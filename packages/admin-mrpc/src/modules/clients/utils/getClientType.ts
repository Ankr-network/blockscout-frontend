import { ClientType } from '../types';

interface IGetClientType {
  ttl?: number;
  hash?: string;
  walletAddress?: string;
  suspended?: boolean;
}

export const getClientType = ({
  ttl,
  hash,
  walletAddress,
  suspended,
}: IGetClientType) => {
  if (suspended) {
    // technically, free clients have type PAYG with status suspended, but we want to show it as a separate type of token in the UI
    return ClientType.FREE;
  }

  if (!walletAddress) {
    return ClientType.UNKNOWN;
  }

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

import { ClientEntity, ClientType } from '../../types';

export const expirableClientTypes = new Set([
  ClientType.Premium,
  ClientType.TestDrivePremium,
  ClientType.ForcedExpirationPremium,
]);

export const clientTypeNaming: Record<ClientType, string> = {
  [ClientType.UNKNOWN]: 'Unknown',
  [ClientType.PAYG]: 'PAYG',
  [ClientType.ForcedExpirationPremium]: 'Premium Forced Expiration',
  [ClientType.Premium]: 'Premium',
  [ClientType.TestDrivePremium]: 'Test',
};

const FORCED_EXPIRATION_DATE = new Date(2023, 1, 25).toLocaleDateString();

const getLocaleDateString = (ttl: ClientEntity['ttl']) =>
  ttl !== undefined ? new Date(ttl * 1000).toLocaleDateString() : undefined;

export const getClientTypeExpiration: Partial<
  Record<ClientType, (ttl: ClientEntity['ttl']) => string | undefined>
> = {
  [ClientType.UNKNOWN]: () => undefined,
  [ClientType.PAYG]: () => undefined,

  [ClientType.ForcedExpirationPremium]: () =>
    `with forced expiration on ${FORCED_EXPIRATION_DATE}`,

  [ClientType.Premium]: ttl => `till ${getLocaleDateString(ttl)}`,
  [ClientType.TestDrivePremium]: ttl => `till ${getLocaleDateString(ttl)}`,
};

export const colorMap: Record<ClientType, string> = {
  [ClientType.UNKNOWN]: 'red',
  [ClientType.PAYG]: 'gold',
  [ClientType.TestDrivePremium]: 'green',
  [ClientType.ForcedExpirationPremium]: 'blue',
  [ClientType.Premium]: 'blue',
};

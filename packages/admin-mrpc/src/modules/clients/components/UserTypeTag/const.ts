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
  [ClientType.PENDING]: 'Pending',
};

const FORCED_EXPIRATION_DATE = new Date(2023, 1, 25).toLocaleDateString();

export const getTtlString = (ttl: ClientEntity['ttl']) =>
  ttl !== undefined ? new Date(ttl * 1000).toLocaleDateString() : undefined;

export const getClientTypeExpiration: Partial<
  Record<ClientType, (ttl: ClientEntity['ttl']) => string | undefined>
> = {
  [ClientType.UNKNOWN]: () => undefined,
  [ClientType.PAYG]: () => undefined,
  [ClientType.PENDING]: () => undefined,

  [ClientType.ForcedExpirationPremium]: () =>
    `with forced expiration on ${FORCED_EXPIRATION_DATE}`,

  [ClientType.Premium]: ttl => `till ${getTtlString(ttl)}`,
  [ClientType.TestDrivePremium]: ttl => `till ${getTtlString(ttl)}`,
};

export const colorMap: Record<ClientType, string> = {
  [ClientType.UNKNOWN]: '#7f7f7f',
  [ClientType.PAYG]: '#3AC090',
  [ClientType.TestDrivePremium]: '#D22C54',
  [ClientType.ForcedExpirationPremium]: '#EEA941',
  [ClientType.Premium]: '#356DF3',
  [ClientType.PENDING]: '#7f7f7f',
};

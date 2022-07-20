import { PresetColorType, PresetStatusColorType } from 'antd/lib/_util/colors';
import { ClientType, ClientEntity } from 'stores/useClients/types';

export const expirableClientTypes = new Set([
  ClientType.Premium,
  ClientType.TestDrivePremium,
  ClientType.ForcedExpirationPremium,
]);

export const clientTypeNaming: Record<ClientType, string> = {
  [ClientType.UNKNOWN]: 'Unknown',
  [ClientType.PAYG]: 'PAYG',
  [ClientType.ForcedExpirationPremium]: 'Premium',
  [ClientType.Premium]: 'Premium',
  [ClientType.TestDrivePremium]: 'Test Drive Premium',
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

export const colorMap: Record<
  ClientType,
  PresetColorType | PresetStatusColorType
> = {
  [ClientType.UNKNOWN]: 'error',
  [ClientType.PAYG]: 'gold',
  [ClientType.TestDrivePremium]: 'cyan',
  [ClientType.ForcedExpirationPremium]: 'geekblue',
  [ClientType.Premium]: 'geekblue',
};

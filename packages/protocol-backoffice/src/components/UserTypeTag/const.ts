import { PresetColorType, PresetStatusColorType } from 'antd/lib/_util/colors';
import { EClientType, TClientEntity } from 'stores/useClients/types';

export const expirableClientTypes = new Set([
  EClientType.Premium,
  EClientType.TestDrivePremium,
  EClientType.ForcedExpirationPremium,
]);

export const clientTypeNaming: Record<EClientType, string> = {
  [EClientType.UNKNOWN]: 'Unknown',
  [EClientType.PAYG]: 'PAYG',
  [EClientType.ForcedExpirationPremium]: 'Premium',
  [EClientType.Premium]: 'Premium',
  [EClientType.TestDrivePremium]: 'Test Drive Premium',
};

const FORCED_EXPIRATION_DATE = new Date(2023, 1, 25).toLocaleDateString();

const getLocaleDateString = (ttl: TClientEntity['ttl']) =>
  ttl !== undefined ? new Date(ttl * 1000).toLocaleDateString() : undefined;

export const getClientTypeExpiration: Partial<
  Record<EClientType, (ttl: TClientEntity['ttl']) => string | undefined>
> = {
  [EClientType.UNKNOWN]: () => undefined,
  [EClientType.PAYG]: () => undefined,

  [EClientType.ForcedExpirationPremium]: () =>
    `with forced expiration on ${FORCED_EXPIRATION_DATE}`,

  [EClientType.Premium]: ttl => `till ${getLocaleDateString(ttl)}`,
  [EClientType.TestDrivePremium]: ttl => `till ${getLocaleDateString(ttl)}`,
};

export const colorMap: Record<
  EClientType,
  PresetColorType | PresetStatusColorType
> = {
  [EClientType.UNKNOWN]: 'error',
  [EClientType.PAYG]: 'gold',
  [EClientType.TestDrivePremium]: 'cyan',
  [EClientType.ForcedExpirationPremium]: 'geekblue',
  [EClientType.Premium]: 'geekblue',
};

import { ProvidersMap } from '../../../common/types';

export const getAuthRequestKey = (providerId: keyof ProvidersMap): string => {
  return `/provider-${providerId}`;
};

export const getFullAuthRequestKey = (providerId: keyof ProvidersMap): string =>
  `auth/connect${getAuthRequestKey(providerId)}`;

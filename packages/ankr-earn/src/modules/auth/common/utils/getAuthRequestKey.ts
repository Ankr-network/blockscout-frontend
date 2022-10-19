import { AvailableWriteProviders } from '@ankr.com/provider-core';

export const getAuthRequestKey = (
  providerId: AvailableWriteProviders,
): string => {
  return `/provider-${providerId}`;
};

export const getFullAuthRequestKey = (
  providerId: AvailableWriteProviders,
): string => `auth/connect${getAuthRequestKey(providerId)}`;

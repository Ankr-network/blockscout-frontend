import { AvailableWriteProviders } from 'provider';

export const getAuthRequestKey = (
  providerId: AvailableWriteProviders,
): string => {
  return `/provider-${providerId}`;
};

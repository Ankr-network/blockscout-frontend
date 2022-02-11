import { AvailableWriteProviders } from 'provider/providerManager/types';

export const getAuthRequestKey = (providerId: AvailableWriteProviders) => {
  return `/provider-${providerId}`;
};

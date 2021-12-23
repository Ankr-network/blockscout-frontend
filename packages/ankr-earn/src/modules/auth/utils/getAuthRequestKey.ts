import { AvailableProviders } from 'provider/providerManager/types';

export const getAuthRequestKey = (providerId: AvailableProviders) => {
  return `/provider-${providerId}`;
};

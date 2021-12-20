import { availableProvidersMap } from 'modules/api/ProviderManager/const';
import { AvailableProviders } from '../../api/ProviderManager/types';

export const getAuthRequestKey = (providerId: AvailableProviders) => {
  return `/network-${availableProvidersMap[providerId]}`;
};

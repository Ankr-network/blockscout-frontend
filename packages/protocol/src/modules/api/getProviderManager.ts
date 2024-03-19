import {
  IExtraProviders,
  IProviders,
  ProviderManager,
} from '@ankr.com/provider';

import { ProviderManagerSingleton } from './ProviderManagerSingleton';

export function getProviderManager<
  ProvidersMap extends IProviders & IExtraProviders,
>(): ProviderManager<ProvidersMap> {
  return ProviderManagerSingleton.getInstance();
}

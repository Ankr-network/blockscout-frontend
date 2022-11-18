import {
  IExtraProviders,
  IProviders,
  ProviderManager,
} from '@ankr.com/provider';
import { web3ModalTheme } from './Web3ModalKeyProvider';

export class ProviderManagerSingleton {
  private static instance?: ProviderManager<any>;

  public static getInstance<
    ProvidersMap extends IProviders & IExtraProviders,
  >() {
    if (ProviderManagerSingleton.instance) {
      return ProviderManagerSingleton.instance;
    }

    ProviderManagerSingleton.instance = new ProviderManager<ProvidersMap>(
      web3ModalTheme,
      {},
    );

    return ProviderManagerSingleton.instance;
  }

  public static removeInstance() {
    ProviderManagerSingleton.instance = undefined;
  }
}

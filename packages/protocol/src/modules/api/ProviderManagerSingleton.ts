import { ProviderManager } from '@ankr.com/provider';
import { web3ModalTheme } from './Web3ModalKeyProvider';

export class ProviderManagerSingleton {
  private static instance?: ProviderManager;

  public static getInstance() {
    if (ProviderManagerSingleton.instance) {
      return ProviderManagerSingleton.instance;
    }

    ProviderManagerSingleton.instance = new ProviderManager(web3ModalTheme);

    return ProviderManagerSingleton.instance;
  }

  public static removeInstance() {
    ProviderManagerSingleton.instance = undefined;
  }
}

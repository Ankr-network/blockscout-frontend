import { ProviderManager } from 'provider';
import { ThemeColors } from 'web3modal';
import { web3ModalTheme } from './Web3ModalKeyProvider';

export class ProviderManagerSingleton {
  private static instance: ProviderManager;

  public static getInstance() {
    if (ProviderManagerSingleton.instance) {
      return ProviderManagerSingleton.instance;
    }

    ProviderManagerSingleton.instance = new ProviderManager(
      web3ModalTheme as ThemeColors,
    );

    return ProviderManagerSingleton.instance;
  }
}

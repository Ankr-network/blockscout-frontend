import { ProviderManager } from '@ankr.com/provider';

export class ProviderManagerSingleton {
  private static instance?: ProviderManager<any>;

  public static getInstance() {
    if (ProviderManagerSingleton.instance) {
      return ProviderManagerSingleton.instance;
    }

    ProviderManagerSingleton.instance = new ProviderManager();

    return ProviderManagerSingleton.instance;
  }

  public static removeInstance() {
    ProviderManagerSingleton.instance = undefined;
  }
}

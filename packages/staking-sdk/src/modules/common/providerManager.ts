import { IExtraProviders, IProviders, ProviderManager } from '@ankr.com/provider';

/**
 * Need to get rid of theme from ProviderManager
 *
 * @deprecated
 */
export const DEFAULT_THEME = {
  background: '#FFF',
  main: '#1F2226',
  secondary: '#1F2226',
  border: '#F2F5FA',
  hover: '#F2F5FA',
};

/**
 * Internal Provider manager singleton class
 *
 * @class
 */
export class ProviderManagerSingleton {
  /**
   * instance - provider manager instance
   * @type {ProviderManager}
   * @static
   * @private
   */
  private static instance: ProviderManager<any>;

  /**
   * Initialization method for provider manage
   *
   * @public
   * @returns {Promise<ProviderManager>}
   */
  public static getInstance<
    ProvidersMap extends IProviders & IExtraProviders
    >(): ProviderManager<ProvidersMap>
  {
    if (ProviderManagerSingleton.instance) {
      return ProviderManagerSingleton.instance;
    }

    ProviderManagerSingleton.instance =
      new ProviderManager<ProvidersMap>(DEFAULT_THEME);

    return ProviderManagerSingleton.instance;
  }
}

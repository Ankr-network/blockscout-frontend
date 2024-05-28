import {
  AvailableReadProviders,
  IPartialRpcUrlsConfig,
  ProviderManager,
  DEFAULT_RPC,
  EEthereumNetworkId,
} from '@ankr.com/provider';

import { getWeb3EthRpcUrl } from './utils/getWeb3Instance';

const RPC_URLS: IPartialRpcUrlsConfig = {
  [AvailableReadProviders.ethMainnet]: getWeb3EthRpcUrl(),
};

export class ProviderManagerSingleton {
  private static instance?: ProviderManager<any>;

  public static getInstance() {
    if (ProviderManagerSingleton.instance) {
      return ProviderManagerSingleton.instance;
    }

    DEFAULT_RPC[EEthereumNetworkId.mainnet] = getWeb3EthRpcUrl();

    ProviderManagerSingleton.instance = new ProviderManager(
      undefined,
      RPC_URLS,
    );

    return ProviderManagerSingleton.instance;
  }

  public static removeInstance() {
    ProviderManagerSingleton.instance = undefined;
  }
}

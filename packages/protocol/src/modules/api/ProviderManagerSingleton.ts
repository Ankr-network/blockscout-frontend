import {
  AvailableReadProviders,
  IPartialRpcUrlsConfig,
  ProviderManager,
  DEFAULT_RPC,
  EEthereumNetworkId,
} from '@ankr.com/provider';

import { getWeb3RpcUrl } from './utils/getWeb3Instance';

const RPC_URLS: IPartialRpcUrlsConfig = {
  [AvailableReadProviders.ethMainnet]: getWeb3RpcUrl(),
};

export class ProviderManagerSingleton {
  private static instance?: ProviderManager<any>;

  public static getInstance() {
    if (ProviderManagerSingleton.instance) {
      return ProviderManagerSingleton.instance;
    }

    DEFAULT_RPC[EEthereumNetworkId.mainnet] = getWeb3RpcUrl();

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

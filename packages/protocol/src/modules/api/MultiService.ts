import {
  AvailableWriteProviders,
  EEthereumNetworkId,
} from '@ankr.com/provider';
import { t } from 'modules/i18n/utils/intl';

import {
  MultiRpcWeb3Sdk,
  MultiRpcSdk,
  configFromEnv,
  MultiRpcWeb3ReadSdk,
} from 'multirpc-sdk';
import { API_ENV, getReadProviderId } from '../common/utils/environment';
import { ProviderManagerSingleton } from './ProviderManagerSingleton';

export const INJECTED_WALLET_ID = 'injected';

export const CONFIG = configFromEnv(API_ENV);

export class MultiService {
  private static web3Service?: MultiRpcWeb3Sdk;

  private static service?: MultiRpcSdk;

  private static web3ReadService?: MultiRpcWeb3ReadSdk;

  // createInstance in connect action
  public static async createWeb3Service(
    walletId: string,
  ): Promise<MultiRpcWeb3Sdk> {
    const providerManager = ProviderManagerSingleton.getInstance();

    const provider = await providerManager.getETHWriteProvider(walletId);

    const isEthereumNetwork =
      provider.currentChain === EEthereumNetworkId.mainnet ||
      provider.currentChain === EEthereumNetworkId.goerli;

    if (!isEthereumNetwork && walletId !== INJECTED_WALLET_ID) {
      MultiService.removeServices();

      throw new Error(t('error.not-supported-chain'));
    }

    MultiService.web3Service = new MultiRpcWeb3Sdk(provider, CONFIG);

    return MultiService.web3Service;
  }

  // use getWeb3Service after createInstance in the app for methods with web3 connect
  public static async getWeb3Service(): Promise<MultiRpcWeb3Sdk> {
    return MultiService.web3Service as MultiRpcWeb3Sdk;
  }

  public static removeServices() {
    MultiService.web3Service = undefined;
    ProviderManagerSingleton.getInstance().disconnect(
      AvailableWriteProviders.ethCompatible,
    );

    ProviderManagerSingleton.removeInstance();
    MultiService.service = undefined;
    MultiService.web3ReadService = undefined;
  }

  // use getWeb3ReadService for web3 methods without web3 connect
  public static async getWeb3ReadService(): Promise<MultiRpcWeb3ReadSdk> {
    if (!MultiService.web3ReadService) {
      const providerManager = ProviderManagerSingleton.getInstance();

      const readProvider = await providerManager.getETHReadProvider(
        getReadProviderId(API_ENV),
      );

      MultiService.web3ReadService = new MultiRpcWeb3ReadSdk(
        readProvider,
        CONFIG,
      );
    }

    return MultiService.web3ReadService;
  }

  // use getService for methods without web3 connect
  public static getService(): MultiRpcSdk {
    if (!MultiService.service) {
      MultiService.service = new MultiRpcSdk(CONFIG);
    }

    return MultiService.service;
  }
}

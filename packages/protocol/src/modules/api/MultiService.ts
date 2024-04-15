import {
  AvailableWriteProviders,
  EEthereumNetworkId,
} from '@ankr.com/provider';
import {
  MultiRpcWeb3Sdk,
  MultiRpcSdk,
  configFromEnv,
  MultiRpcWeb3ReadSdk,
} from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { API_ENV, getReadProviderId } from '../common/utils/environment';
import { ProviderManagerSingleton } from './ProviderManagerSingleton';
import { getProviderManager } from './getProviderManager';

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
    const providerManager = getProviderManager();

    const writeProvider = await providerManager.getETHWriteProvider(walletId);

    const readProvider = await providerManager.getETHReadProvider(
      getReadProviderId(API_ENV),
    );

    const isEthereumNetwork =
      writeProvider.currentChain === EEthereumNetworkId.mainnet ||
      writeProvider.currentChain === EEthereumNetworkId.holesky;

    if (!isEthereumNetwork && walletId !== INJECTED_WALLET_ID) {
      MultiService.removeServices();

      throw new Error(t('error.not-supported-chain'));
    }

    MultiService.web3Service = new MultiRpcWeb3Sdk(
      writeProvider,
      readProvider,
      CONFIG,
    );

    return MultiService.web3Service;
  }

  public static getWeb3Service() {
    return MultiService.web3Service;
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

export const getAccountingGateway = () =>
  MultiService.getService().getAccountingGateway();

export const getEnterpriseGateway = () =>
  MultiService.getService().getEnterpriseGateway();

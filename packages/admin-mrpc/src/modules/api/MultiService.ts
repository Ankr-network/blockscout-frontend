import { Mutex } from 'async-mutex';

import { AdminMrpcSdk, configFromEnv, MultiRpcSdk } from 'multirpc-sdk';
import { API_ENV } from '../common/utils/environment';
import { ProviderManagerSingleton } from './ProviderManagerSingleton';

const mutex = new Mutex();

export class MultiService {
  private static instance?: AdminMrpcSdk;

  private static service?: MultiRpcSdk;

  public static async getWeb3Service(): Promise<AdminMrpcSdk> {
    await mutex.runExclusive(async () => {
      if (!MultiService.instance) {
        const providerManager = ProviderManagerSingleton.getInstance();

        const provider = await providerManager.getETHWriteProvider();

        MultiService.instance = new AdminMrpcSdk(
          provider,
          configFromEnv(API_ENV).backofficeUrl,
        );
      }
    });

    return MultiService.instance as AdminMrpcSdk;
  }

  public static removeInstance() {
    MultiService.instance = undefined;
    MultiService.service = undefined;
    ProviderManagerSingleton.removeInstance();
  }

  // use getService for methods without web3 connect
  public static getService(): MultiRpcSdk {
    if (!MultiService.service) {
      MultiService.service = new MultiRpcSdk(configFromEnv(API_ENV));
    }

    return MultiService.service;
  }
}

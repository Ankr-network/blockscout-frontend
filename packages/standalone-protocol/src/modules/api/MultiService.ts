import { MultiRpcWeb3Sdk, MultiRpcSdk } from 'multirpc-sdk';
import { Mutex } from 'async-mutex';

import { ProviderManagerSingleton } from './ProviderManagerSingleton';
import { getConfig } from './utils/getConfig';

const mutex = new Mutex();

export class MultiService {
  private static instance: MultiRpcWeb3Sdk;

  private static publicInstance?: MultiRpcSdk;

  public static async getWeb3Service(): Promise<MultiRpcWeb3Sdk> {
    await mutex.runExclusive(async () => {
      if (!MultiService.instance) {
        const providerManager = ProviderManagerSingleton.getInstance();
        const provider = await providerManager.getETHWriteProvider();

        MultiService.instance = new MultiRpcWeb3Sdk(provider, getConfig());
      }
    });

    return MultiService.instance;
  }

  public static getService(): MultiRpcSdk {
    if (!MultiService.publicInstance) {
      MultiService.publicInstance = new MultiRpcSdk(getConfig());
    }

    return MultiService.publicInstance;
  }
}

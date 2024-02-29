import { MultiRpcWeb3Sdk, MultiRpcSdk } from 'multirpc-sdk';
import { Mutex } from 'async-mutex';

import { API_ENV, getReadProviderId } from 'modules/common/utils/environment';

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
        const writeProvider = await providerManager.getETHWriteProvider();
        const readProvider = await providerManager.getETHReadProvider(
          getReadProviderId(API_ENV),
        );

        MultiService.instance = new MultiRpcWeb3Sdk(
          writeProvider,
          readProvider,
          getConfig(),
        );
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

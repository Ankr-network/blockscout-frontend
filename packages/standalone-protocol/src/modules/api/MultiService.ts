import { MultiRpcSdk, ProtocolPublicSdk } from 'multirpc-sdk';
import { Mutex } from 'async-mutex';

import { ProviderManagerSingleton } from './ProviderManagerSingleton';
import { getConfig } from './utils/getConfig';

const mutex = new Mutex();

export class MultiService {
  private static instance: MultiRpcSdk;

  private static publicInstance?: ProtocolPublicSdk;

  public static async getInstance(): Promise<MultiRpcSdk> {
    await mutex.runExclusive(async () => {
      if (!MultiService.instance) {
        const providerManager = ProviderManagerSingleton.getInstance();
        const provider = await providerManager.getETHWriteProvider();

        MultiService.instance = new MultiRpcSdk(provider, getConfig());
      }
    });

    return MultiService.instance;
  }

  public static getPublicInstance(): ProtocolPublicSdk {
    if (!MultiService.publicInstance) {
      MultiService.publicInstance = new ProtocolPublicSdk(getConfig());
    }

    return MultiService.publicInstance;
  }
}

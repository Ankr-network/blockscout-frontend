import { Mutex } from 'async-mutex';

import { MultiRpcSdk, ProtocolPublicSdk, configFromEnv } from 'multirpc-sdk';
import { API_ENV } from '../common/utils/environment';
import { ProviderManagerSingleton } from './ProviderManagerSingleton';

const mutex = new Mutex();

export class MultiService {
  private static instance?: MultiRpcSdk;

  private static publicInstance?: ProtocolPublicSdk;

  public static async getInstance(): Promise<MultiRpcSdk> {
    await mutex.runExclusive(async () => {
      if (!MultiService.instance) {
        const providerManager = ProviderManagerSingleton.getInstance();

        const provider = await providerManager.getETHWriteProvider();

        MultiService.instance = new MultiRpcSdk(
          provider,
          configFromEnv(API_ENV),
        );
      }
    });

    return MultiService.instance as MultiRpcSdk;
  }

  public static removeInstance() {
    MultiService.instance = undefined;
    ProviderManagerSingleton.removeInstance();
  }

  public static getPublicInstance(): ProtocolPublicSdk {
    if (!MultiService.publicInstance) {
      MultiService.publicInstance = new ProtocolPublicSdk(
        configFromEnv(API_ENV),
      );
    }

    return MultiService.publicInstance;
  }
}

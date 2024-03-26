import { Mutex } from 'async-mutex';
import { AdminMrpcSdk, configFromEnv, MultiRpcSdk } from 'multirpc-sdk';

import { API_ENV } from '../common/utils/environment';

const mutex = new Mutex();

export class MultiService {
  private static instance?: AdminMrpcSdk;

  private static service?: MultiRpcSdk;

  public static async getWeb3Service(): Promise<AdminMrpcSdk> {
    await mutex.runExclusive(async () => {
      if (!MultiService.instance) {
        MultiService.instance = new AdminMrpcSdk(
          configFromEnv(API_ENV).backofficeUrl,
          configFromEnv(API_ENV).uAuthUrl,
        );
      }
    });

    return MultiService.instance as AdminMrpcSdk;
  }

  public static removeInstance() {
    MultiService.instance = undefined;
    MultiService.service = undefined;
  }

  // use getService for methods without web3 connect
  public static getService(): MultiRpcSdk {
    if (!MultiService.service) {
      MultiService.service = new MultiRpcSdk(configFromEnv(API_ENV));
    }

    return MultiService.service;
  }
}

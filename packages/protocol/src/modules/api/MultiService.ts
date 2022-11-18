import {
  AvailableWriteProviders,
  EEthereumNetworkId,
} from '@ankr.com/provider';
import { Mutex } from 'async-mutex';
import { t } from 'modules/i18n/utils/intl';

import { MultiRpcSdk, ProtocolPublicSdk, configFromEnv } from 'multirpc-sdk';
import { API_ENV } from '../common/utils/environment';
import { ProviderManagerSingleton } from './ProviderManagerSingleton';

export const INJECTED_WALLET_ID = 'injected';

const mutex = new Mutex();

export class MultiService {
  private static instance?: MultiRpcSdk;

  private static publicInstance?: ProtocolPublicSdk;

  public static async getInstance(walletId?: string): Promise<MultiRpcSdk> {
    await mutex.runExclusive(async () => {
      if (!MultiService.instance) {
        const providerManager = ProviderManagerSingleton.getInstance();

        const provider = await providerManager.getETHWriteProvider(walletId);

        const isEthereumNetwork =
          provider.currentChain === EEthereumNetworkId.mainnet ||
          provider.currentChain === EEthereumNetworkId.goerli;

        if (!isEthereumNetwork && walletId !== INJECTED_WALLET_ID) {
          MultiService.removeInstance();

          throw new Error(t('error.not-supported-chain'));
        }

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
    ProviderManagerSingleton.getInstance().disconnect(
      AvailableWriteProviders.ethCompatible,
    );

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

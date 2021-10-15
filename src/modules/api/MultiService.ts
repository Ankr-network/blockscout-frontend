import MultiRpcSdk from '@ankr.com/multirpc';
import { Web3KeyProvider } from '@ankr.com/stakefi-web3';
import { Web3ModalKeyProvider } from './Web3ModalKeyProvider';

export class MultiService {
  private static instance: MultiRpcSdk;

  private static provider: Web3KeyProvider;

  private static getProvider(): Web3KeyProvider {
    if (!MultiService.provider) {
      MultiService.provider = new Web3ModalKeyProvider({
        expectedChainId: 5,
      });
    }

    return MultiService.provider;
  }

  public static getInstance(): {
    service: MultiRpcSdk;
    provider: Web3KeyProvider;
  } {
    if (!MultiService.instance) {
      const provider = MultiService.getProvider();

      MultiService.instance = new MultiRpcSdk(provider);
    }

    return { service: MultiService.instance, provider: MultiService.provider };
  }
}

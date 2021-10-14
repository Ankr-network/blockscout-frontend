import MultiRpcSdk from '@ankr.com/multirpc';
import { Web3KeyProvider } from '@ankr.com/stakefi-web3';

export class MultiService {
  private static instance: MultiRpcSdk;

  public static getInstance() {
    if (!MultiService.instance) {
      const provider = new Web3KeyProvider({
        expectedChainId: 1,
      });

      MultiService.instance = new MultiRpcSdk(provider);
    }

    return MultiService.instance;
  }
}

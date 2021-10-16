import MultiRpcSdk from '@ankr.com/multirpc';
import { Web3KeyProvider } from '@ankr.com/stakefi-web3';

export class MultiService {
  private static instance: MultiRpcSdk;

  public static getInstance(): { service: MultiRpcSdk } {
    if (!MultiService.instance) {
      MultiService.instance = new MultiRpcSdk(
        new Web3KeyProvider({
          expectedChainId: 0x05,
        }),
      );
    }
    return { service: MultiService.instance };
  }
}

import MultiRpcSdk, { configFromEnv } from '@ankr.com/multirpc';
import { Web3KeyProvider } from '@ankr.com/stakefi-web3';
import { API_ENV, getExpectedChainId } from '../common/utils/environment';

export class MultiService {
  private static instance: MultiRpcSdk;

  public static getInstance(): { service: MultiRpcSdk } {
    // eslint-disable-next-line no-console
    console.log('API_ENV', API_ENV);
    // eslint-disable-next-line no-debugger
    debugger;
    if (!MultiService.instance) {
      MultiService.instance = new MultiRpcSdk(
        new Web3KeyProvider({
          expectedChainId: getExpectedChainId(API_ENV),
        }),
        configFromEnv(API_ENV),
      );
    }
    return { service: MultiService.instance };
  }
}

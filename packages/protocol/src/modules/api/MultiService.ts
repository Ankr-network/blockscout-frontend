import MultiRpcSdk, { configFromEnv } from 'multirpc-sdk';
import { Web3KeyProvider } from '@ankr.com/stakefi-web3';
import { API_ENV } from '../common/utils/environment';

export class MultiService {
  private static instance: MultiRpcSdk;

  public static getInstance(): { service: MultiRpcSdk } {
    if (!MultiService.instance) {
      MultiService.instance = new MultiRpcSdk(
        new Web3KeyProvider({}),
        configFromEnv(API_ENV),
      );
    }
    return { service: MultiService.instance };
  }
}

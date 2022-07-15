import { MultiRpcSdk, configFromEnv } from 'multirpc-sdk';
import { Web3KeyProvider } from '@ankr.com/stakefi-web3';
import { API_ENV } from 'utils/environment';

export const web3KeyProvider = new Web3KeyProvider({});

export class MultiService {
  private static instance: MultiRpcSdk;

  public static getInstance(): { service: MultiRpcSdk } {
    if (!MultiService.instance) {
      MultiService.instance = new MultiRpcSdk(
        web3KeyProvider,
        configFromEnv(API_ENV),
      );
    }

    return { service: MultiService.instance };
  }
}

import MultiRpcSdk, { configFromEnv } from 'multirpc-sdk';
import { Web3KeyProvider } from '@ankr.com/stakefi-web3';
import { API_ENV } from '../common/utils/environment';

const { REACT_APP_CHAIN_ID, REACT_APP_IS_HOMEPAGE_BUILD_FOR_ERIGON } =
  process.env;

export class MultiService {
  private static instance: MultiRpcSdk;

  public static getInstance(): { service: MultiRpcSdk } {
    if (!MultiService.instance) {
      const config = configFromEnv(API_ENV);

      let workerUrl = '/';

      if (API_ENV === 'staging') {
        workerUrl = config.workerUrl;
      } else if (
        REACT_APP_CHAIN_ID === 'erigonbsc' &&
        REACT_APP_IS_HOMEPAGE_BUILD_FOR_ERIGON
      ) {
        workerUrl = config.workerUrl;
      }

      MultiService.instance = new MultiRpcSdk(new Web3KeyProvider({}), {
        ...config,
        workerUrl,
      });
    }

    return { service: MultiService.instance };
  }
}

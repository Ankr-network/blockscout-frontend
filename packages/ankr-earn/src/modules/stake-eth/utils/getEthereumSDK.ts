import { AvailableReadProviders } from '@ankr.com/provider';
import { EthereumSDK, IEthSDKArgs } from '@ankr.com/staking-sdk';

import { configFromEnv } from 'modules/api/config';
import { getProviderManager } from 'modules/api/getProviderManager';
import { featuresConfig, isMainnet } from 'modules/common/const';

const { gatewayConfig } = configFromEnv();

const providerId = isMainnet
  ? AvailableReadProviders.ethMainnet
  : AvailableReadProviders.ethGoerli;

export const getEthereumSDK = async (): Promise<EthereumSDK> => {
  const providerManager = getProviderManager();

  const apiUrl = featuresConfig.isBffEnabled
    ? gatewayConfig.advancedApiUrl
    : undefined;

  const params: Partial<IEthSDKArgs> = {
    apiUrl,
    readProvider: await providerManager.getETHReadProvider(providerId),
  };

  return EthereumSDK.getInstance(params);
};

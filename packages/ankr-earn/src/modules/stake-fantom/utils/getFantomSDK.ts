import { AvailableReadProviders } from '@ankr.com/provider';
import { FantomSDK, IFantomSDKArgs } from '@ankr.com/staking-sdk';

import { configFromEnv } from 'modules/api/config';
import { getProviderManager } from 'modules/api/getProviderManager';
import { featuresConfig, isMainnet } from 'modules/common/const';

const { gatewayConfig } = configFromEnv();

const providerId = isMainnet
  ? AvailableReadProviders.ftmOpera
  : AvailableReadProviders.ftmTestnet;

export const getFantomSDK = async (): Promise<FantomSDK> => {
  const providerManager = getProviderManager();

  const apiUrl = featuresConfig.isBffEnabled
    ? gatewayConfig.advancedApiUrl
    : undefined;

  const params: Partial<IFantomSDKArgs> = {
    apiUrl,
    readProvider: await providerManager.getETHReadProvider(providerId),
  };

  return FantomSDK.getInstance(params);
};

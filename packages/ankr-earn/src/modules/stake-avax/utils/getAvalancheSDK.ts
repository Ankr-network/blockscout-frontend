import { AvailableReadProviders } from '@ankr.com/provider';
import { AvalancheSDK, IAvalancheSDKArgs } from '@ankr.com/staking-sdk';

import { configFromEnv } from 'modules/api/config';
import { getProviderManager } from 'modules/api/getProviderManager';
import { featuresConfig, isMainnet } from 'modules/common/const';

const { gatewayConfig } = configFromEnv();

const providerId = isMainnet
  ? AvailableReadProviders.avalancheChain
  : AvailableReadProviders.avalancheChainTest;

export const getAvalancheSDK = async (): Promise<AvalancheSDK> => {
  const providerManager = getProviderManager();

  const apiUrl = featuresConfig.isBffEnabled
    ? gatewayConfig.advancedApiUrl
    : undefined;

  const params: Partial<IAvalancheSDKArgs> = {
    apiUrl,
    readProvider: await providerManager.getETHReadProvider(providerId),
  };

  return AvalancheSDK.getInstance(params);
};

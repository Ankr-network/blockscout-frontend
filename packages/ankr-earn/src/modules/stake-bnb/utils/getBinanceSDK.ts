import { AvailableReadProviders } from '@ankr.com/provider';
import { BinanceSDK, IBinanceSDKArgs } from '@ankr.com/staking-sdk';

import { configFromEnv } from 'modules/api/config';
import { getProviderManager } from 'modules/api/getProviderManager';
import { featuresConfig, isMainnet } from 'modules/common/const';

const { gatewayConfig } = configFromEnv();

const providerId = isMainnet
  ? AvailableReadProviders.binanceChain
  : AvailableReadProviders.binanceChainTest;

export const getBinanceSDK = async (): Promise<BinanceSDK> => {
  const providerManager = getProviderManager();

  const apiUrl = featuresConfig.isBffEnabled
    ? gatewayConfig.advancedApiUrl
    : undefined;

  const params: Partial<IBinanceSDKArgs> = {
    apiUrl,
    readProvider: await providerManager.getETHReadProvider(providerId),
  };

  return BinanceSDK.getInstance(params);
};

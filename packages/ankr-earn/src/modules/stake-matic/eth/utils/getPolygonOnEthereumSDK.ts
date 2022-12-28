import { AvailableReadProviders } from '@ankr.com/provider';
import { IPolygonSDKArgs, PolygonOnEthereumSDK } from '@ankr.com/staking-sdk';

import { configFromEnv } from 'modules/api/config';
import { getProviderManager } from 'modules/api/getProviderManager';
import { featuresConfig, isMainnet } from 'modules/common/const';

const { gatewayConfig } = configFromEnv();

const providerId = isMainnet
  ? AvailableReadProviders.ethMainnet
  : AvailableReadProviders.ethGoerli;

export const getPolygonOnEthereumSDK =
  async (): Promise<PolygonOnEthereumSDK> => {
    const providerManager = getProviderManager();

    const apiUrl = featuresConfig.isBffEnabled
      ? gatewayConfig.advancedApiUrl
      : undefined;

    const params: Partial<IPolygonSDKArgs> = {
      apiUrl,
      readProvider: await providerManager.getETHReadProvider(providerId),
    };

    return PolygonOnEthereumSDK.getInstance(params);
  };

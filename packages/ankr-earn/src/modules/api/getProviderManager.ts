import {
  AvailableReadProviders,
  IExtraProviders,
  IProviders,
  ProviderManager,
} from '@ankr.com/provider';
import { ProviderManagerSingleton } from '@ankr.com/staking-sdk';

import {
  BASE_DEV_BFF_URL,
  BASE_PROD_BFF_URL,
  featuresConfig,
} from 'modules/common/const';

const DEV_BFF_MRPC_URL = `${BASE_DEV_BFF_URL}/multi-rpc/proxy`;
const PROD_BFF_MRPC_URL = `${BASE_PROD_BFF_URL}/multi-rpc/proxy`;

export const RPC_URLS: Record<AvailableReadProviders, string> = {
  [AvailableReadProviders.ethMainnet]: `${PROD_BFF_MRPC_URL}/eth`,
  [AvailableReadProviders.ethGoerli]: `${DEV_BFF_MRPC_URL}/eth_goerli`,
  [AvailableReadProviders.avalancheChain]: `${PROD_BFF_MRPC_URL}/avalanche`,
  [AvailableReadProviders.avalancheChainTest]: `${DEV_BFF_MRPC_URL}/avalanche_fuji`,
  [AvailableReadProviders.binanceChain]: `${PROD_BFF_MRPC_URL}/bsc`,
  [AvailableReadProviders.binanceChainTest]: `${DEV_BFF_MRPC_URL}/bsc_testnet_chapel`,
  [AvailableReadProviders.ftmOpera]: `${PROD_BFF_MRPC_URL}/fantom`,
  [AvailableReadProviders.ftmTestnet]: `${DEV_BFF_MRPC_URL}/fantom_testnet`,
  [AvailableReadProviders.mumbai]: `${DEV_BFF_MRPC_URL}/polygon_mumbai`,
  [AvailableReadProviders.polygon]: `${PROD_BFF_MRPC_URL}/polygon`,
  [AvailableReadProviders.gnosis]: `${PROD_BFF_MRPC_URL}/gnosis`,
  [AvailableReadProviders.sokol]: 'https://sokol.poa.network',
  [AvailableReadProviders.xdc]: 'https://erpc.xinfin.network',
  [AvailableReadProviders.xdcTestnet]: 'https://erpc.apothem.network',
};

export function getProviderManager<
  ProvidersMap extends IProviders & IExtraProviders,
>(): ProviderManager<ProvidersMap> {
  const rpcUrls = featuresConfig.isBffEnabled ? RPC_URLS : undefined;
  return ProviderManagerSingleton.getInstance<ProvidersMap>(rpcUrls);
}

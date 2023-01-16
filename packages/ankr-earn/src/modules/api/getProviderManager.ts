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
  isMainnet,
} from 'modules/common/const';

const BFF_BY_ENV_URL = isMainnet ? BASE_PROD_BFF_URL : BASE_DEV_BFF_URL;
const BFF_MRPC_URL = `${BFF_BY_ENV_URL}/multi-rpc/proxy`;

export const RPC_URLS: Record<AvailableReadProviders, string> = {
  [AvailableReadProviders.ethMainnet]: `${BFF_MRPC_URL}/eth`,
  [AvailableReadProviders.ethGoerli]: `${BFF_MRPC_URL}/eth_goerli`,
  [AvailableReadProviders.avalancheChain]: `${BFF_MRPC_URL}/avalanche`,
  [AvailableReadProviders.avalancheChainTest]: `${BFF_MRPC_URL}/avalanche_fuji`,
  [AvailableReadProviders.binanceChain]: `${BFF_MRPC_URL}/bsc`,
  [AvailableReadProviders.binanceChainTest]: `${BFF_MRPC_URL}/bsc_testnet_chapel`,
  [AvailableReadProviders.ftmOpera]: `${BFF_MRPC_URL}/fantom`,
  [AvailableReadProviders.ftmTestnet]: `${BFF_MRPC_URL}/fantom_testnet`,
  [AvailableReadProviders.mumbai]: `${BFF_MRPC_URL}/polygon_mumbai`,
  [AvailableReadProviders.polygon]: `${BFF_MRPC_URL}/polygon`,
  [AvailableReadProviders.gnosis]: `${BFF_MRPC_URL}/gnosis`,
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

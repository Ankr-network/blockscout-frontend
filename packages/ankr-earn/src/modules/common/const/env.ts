import { AvailableReadProviders } from '@ankr.com/provider';

import { EEthereumNetworkId, Env } from '../types';

export const currentEnv: Env = process.env.REACT_APP_API_ENV
  ? (process.env.REACT_APP_API_ENV as Env)
  : Env.Stage;

export const isMainnet = currentEnv === Env.Production;
export const isLocal = process.env.REACT_APP_IS_LOCAL === 'true';

export const ETH_RPC_URL = process.env.REACT_APP_ETH_RPC;
export const MIXPANEL_TOKEN = process.env.REACT_APP_MIXPANEL_TOKEN as string;

export const ETH_NETWORK_BY_ENV =
  currentEnv === Env.Production
    ? EEthereumNetworkId.mainnet
    : EEthereumNetworkId.goerli;

export const ANKR_NETWORK_BY_ENV =
  currentEnv === Env.Production
    ? EEthereumNetworkId.mainnet
    : EEthereumNetworkId.goerli;

// todo: use actual networks
export const GNO_NETWORK_BY_ENV =
  currentEnv === Env.Production
    ? EEthereumNetworkId.gnosis
    : EEthereumNetworkId.sokol;

export const AVAX_NETWORK_BY_ENV =
  currentEnv === Env.Production
    ? EEthereumNetworkId.avalanche
    : EEthereumNetworkId.avalancheTestnet;

export const BSC_NETWORK_BY_ENV =
  currentEnv === Env.Production
    ? EEthereumNetworkId.smartchain
    : EEthereumNetworkId.smartchainTestnet;

export const FTM_NETWORK_BY_ENV =
  currentEnv === Env.Production
    ? EEthereumNetworkId.fantom
    : EEthereumNetworkId.fantomTestnet;

export const POLYGON_NETWORK_BY_ENV =
  currentEnv === Env.Production
    ? EEthereumNetworkId.polygon
    : EEthereumNetworkId.mumbai;

export const ETH_PROVIDER_BY_ENV =
  currentEnv === Env.Production
    ? AvailableReadProviders.ethMainnet
    : AvailableReadProviders.ethGoerli;

export const AVAX_PROVIDER_BY_ENV =
  currentEnv === Env.Production
    ? AvailableReadProviders.avalancheChain
    : AvailableReadProviders.avalancheChainTest;

export const BSC_PROVIDER_BY_ENV =
  currentEnv === Env.Production
    ? AvailableReadProviders.binanceChain
    : AvailableReadProviders.binanceChainTest;

export const FTM_PROVIDER_BY_ENV =
  currentEnv === Env.Production
    ? AvailableReadProviders.ftmOpera
    : AvailableReadProviders.ftmTestnet;

export const POLYGON_PROVIDER_BY_ENV =
  currentEnv === Env.Production
    ? AvailableReadProviders.polygon
    : AvailableReadProviders.mumbai;

import { currentEnv, Env } from './env';

export interface IGatewayConfig {
  ankrApiBaseUrl: string;
}

export interface IStkrConfig {
  gatewayConfig: IGatewayConfig;
}

/**
 * Local contract addresses and api endpoints
 *
 * @note need to move to a separate package
 */
const LOCAL_CONFIG: IStkrConfig = {
  gatewayConfig: {
    ankrApiBaseUrl: 'https://staging.multi-rpc.com/multichain/',
  },
};

/**
 * Develop contract addresses and api endpoints
 *
 * @note need to move to a separate package
 */
const DEVELOP_CONFIG: IStkrConfig = {
  ...LOCAL_CONFIG,
};

/**
 * Stage contract addresses and api endpoints
 *
 * @note need to move to a separate package
 */
const GOERLI_CONFIG: IStkrConfig = {
  ...LOCAL_CONFIG,
};

/**
 * Mainnet contract addresses and api endpoints
 *
 * @note need to move to a separate package
 */
const MAINNET_CONFIG: IStkrConfig = {
  gatewayConfig: {
    ankrApiBaseUrl: 'https://staging.multi-rpc.com/multichain/',
  },
};

/**
 * Get config for env
 *
 * @note Need to move it to a separate package
 * @deprecated
 * @param {Env} env - environment
 * @returns {IStkrConfig}
 */
export function configFromEnv(env: Env = currentEnv): IStkrConfig {
  switch (env) {
    case Env.Production:
      return MAINNET_CONFIG;
    case Env.Stage:
      return GOERLI_CONFIG;
    case Env.Develop:
      return DEVELOP_CONFIG;
    default:
      return LOCAL_CONFIG;
  }
}

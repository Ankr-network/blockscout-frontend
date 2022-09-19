import { Environment } from 'multirpc-sdk';
import { EEthereumNetworkId } from '@ankr.com/provider';

export const API_ENV: Environment =
  (process.env.REACT_APP_API_ENV as Environment) ?? 'staging';

export const getExpectedChainId = (env: Environment) => {
  if (env === 'prod') {
    return EEthereumNetworkId.mainnet;
  }

  return EEthereumNetworkId.goerli;
};

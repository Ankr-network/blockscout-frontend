import { Environment } from '@ankr.com/multirpc';
import { ChainId } from '@ankr.com/stakefi-web3';

export const API_ENV: Environment =
  (process.env.REACT_APP_API_ENV as Environment) ?? 'staging';

export function getExpectedChainId(env: Environment) {
  if (env === 'prod') {
    return ChainId.Ethereum;
  }

  return ChainId.Goerli;
}

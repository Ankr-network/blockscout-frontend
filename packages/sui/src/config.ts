import { Address } from '@ankr.com/provider';
import { currentEnv, Env, ZERO_ADDRESS } from '@ankr.com/staking-sdk';

interface ISuiConfig {
  aSUIcToken: Address;
  suiPool: Address;
}

const LOCAL_CONFIG: ISuiConfig = {
  aSUIcToken: ZERO_ADDRESS,
  suiPool: ZERO_ADDRESS,
};

const DEV_CONFIG: ISuiConfig = {
  ...LOCAL_CONFIG,
};

const GOERLI_CONFIG: ISuiConfig = {
  ...LOCAL_CONFIG,
};

const MAINNET_CONFIG: ISuiConfig = {
  aSUIcToken: ZERO_ADDRESS,
  suiPool: ZERO_ADDRESS,
};

export function stakingConfigFromEnv(env: Env = currentEnv): ISuiConfig {
  switch (env) {
    case Env.Production:
      return MAINNET_CONFIG;
    case Env.Stage:
      return GOERLI_CONFIG;
    case Env.Develop:
      return DEV_CONFIG;
    default:
      return LOCAL_CONFIG;
  }
}

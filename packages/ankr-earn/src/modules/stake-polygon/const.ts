import { currentEnv } from 'modules/common/const';
import { Env } from 'modules/common/types';
import { AvailableProviders } from 'provider/providerManager/types';

export const POLYGON_PROVIDER_ID =
  currentEnv === Env.Stage
    ? AvailableProviders.Goerli
    : AvailableProviders.Mainnet;

import {
  AMATICB_ABI,
  AMATICC_ABI,
  ABI_ERC20,
  AETHB_ABI,
  AETH_BSC_ABI,
  AETHC_BSC_ABI,
  AFTMB_ABI,
  AFTMC_ABI,
} from '@ankr.com/staking-sdk';

import { configFromEnv } from 'modules/api/config';
import {
  BSC_PROVIDER_BY_ENV,
  ETH_PROVIDER_BY_ENV,
  FTM_PROVIDER_BY_ENV,
  POLYGON_PROVIDER_BY_ENV,
} from 'modules/common/const';
import { Token } from 'modules/common/types/token';

import { IDashboardSDKCotractData } from './types';

const config = configFromEnv();

type TNetworkTokenConfig = Partial<Record<Token, IDashboardSDKCotractData>>;

export const EMPTY_CONTRACT_DATA: IDashboardSDKCotractData = {
  abi: ABI_ERC20,
  address: '',
  providerName: ETH_PROVIDER_BY_ENV,
};

export const bscTokenConfig: TNetworkTokenConfig = {
  [Token.aMATICb]: {
    abi: AMATICB_ABI,
    address: config.binanceConfig.aMATICbToken,
    providerName: BSC_PROVIDER_BY_ENV,
  },

  [Token.aETH]: {
    abi: AETH_BSC_ABI,
    address: config.binanceConfig.aETHToken,
    providerName: BSC_PROVIDER_BY_ENV,
  },

  [Token.aETHc]: {
    abi: AETHC_BSC_ABI,
    address: config.binanceConfig.aETHcToken,
    providerName: BSC_PROVIDER_BY_ENV,
  },

  [Token.aETHb]: {
    abi: AETHB_ABI,
    address: config.binanceConfig.aETHbToken,
    providerName: BSC_PROVIDER_BY_ENV,
  },

  [Token.aMATICc]: {
    abi: AMATICC_ABI,
    address: config.binanceConfig.aMATICcToken,
    providerName: BSC_PROVIDER_BY_ENV,
  },
};

export const ethereumTokenConfig: TNetworkTokenConfig = {
  [Token.aMATICb]: {
    abi: AMATICB_ABI,
    address: config.contractConfig.aMaticbToken,
    providerName: ETH_PROVIDER_BY_ENV,
  },

  [Token.aETHb]: {
    abi: AETHB_ABI,
    address: config.contractConfig.fethContract,
    providerName: ETH_PROVIDER_BY_ENV,
  },
};

export const polygonTokenConfig: TNetworkTokenConfig = {
  [Token.aMATICb]: {
    abi: AMATICB_ABI,
    address: config.polygonConfig.aMATICbToken,
    providerName: POLYGON_PROVIDER_BY_ENV,
  },

  [Token.aMATICc]: {
    abi: AMATICC_ABI,
    address: config.polygonConfig.aMATICcToken,
    providerName: POLYGON_PROVIDER_BY_ENV,
  },
};

export const fantomTokenConfig: TNetworkTokenConfig = {
  [Token.aFTMb]: {
    abi: AFTMB_ABI,
    address: config.fantomConfig.aftmbToken,
    providerName: FTM_PROVIDER_BY_ENV,
  },
  [Token.aFTMc]: {
    abi: AFTMC_ABI,
    address: config.fantomConfig.aftmcToken,
    providerName: FTM_PROVIDER_BY_ENV,
  },
};

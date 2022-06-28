import { AMATICB_ABI, AMATICC_ABI } from '@ankr.com/staking-sdk';

import { configFromEnv } from 'modules/api/config';
import ABI_AETHB from 'modules/api/contract/FETH.json';
import ABI_ERC20 from 'modules/api/contract/IERC20.json';
import {
  BSC_PROVIDER_BY_ENV,
  ETH_PROVIDER_BY_ENV,
  FTM_PROVIDER_BY_ENV,
  POLYGON_PROVIDER_BY_ENV,
} from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import ABI_AETH from 'modules/stake-bnb/api/contracts/aETH.json';
import ABI_AETHС from 'modules/stake-bnb/api/contracts/aETHc.json';
import AFTMB_ABI from 'modules/stake-fantom/api/contracts/aFTMb.json';
import AFTMC_ABI from 'modules/stake-fantom/api/contracts/aFTMc.json';

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
    abi: ABI_AETH,
    address: config.binanceConfig.aETHToken,
    providerName: BSC_PROVIDER_BY_ENV,
  },

  [Token.aETHc]: {
    abi: ABI_AETHС,
    address: config.binanceConfig.aETHcToken,
    providerName: BSC_PROVIDER_BY_ENV,
  },

  [Token.aETHb]: {
    abi: ABI_AETHB,
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
    abi: ABI_AETHB,
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

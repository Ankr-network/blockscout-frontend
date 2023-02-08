import { configFromEnv } from 'modules/api/config';
import { ZERO_ADDR } from 'modules/common/const';
import { Env } from 'modules/common/types';

import { TOpenOceanNetworks, TOpenOceanTokens } from '../types';

type Address = string;

const {
  avalancheConfig: { aAVAXb: aAVAXbContract, aAVAXc: aAVAXcContract },
  binanceConfig: { aBNBbToken: aBNBbContract, aBNBcToken: aBNBcContract },
  contractConfig: {
    ETHContract,
    aMaticCToken: aMATICcInETHContract,
    aMaticbToken: aMATICbInETHContract,
    aethContract: aETHcContract,
    fethContract: aETHbContract,
    maticToken: MATICInETHContract,
  },
  fantomConfig: {
    aftmbToken: aFTMbContract,
    aftmcToken: aFTMcContract,
    ftmToken: FTMContract,
  },
  polygonConfig: {
    aMATICbToken: aMATICbInPolygonContract,
    aMATICcToken: aMATICcInPolygonContract,
    maticToken: MATICInPolygonContract,
  },
} = configFromEnv(Env.Production);

export const getTokenAddress = (
  token: TOpenOceanTokens,
  network?: TOpenOceanNetworks,
): Address => {
  const isPolygonNetwork = network === 'POLYGON';

  switch (token) {
    case 'AVAX':
      return ZERO_ADDR;

    case 'FTM':
      return FTMContract;

    case 'MATIC':
      return isPolygonNetwork ? MATICInPolygonContract : MATICInETHContract;

    case 'aAVAXb':
      return aAVAXbContract;

    case 'aAVAXc':
      return aAVAXcContract;

    case 'aBNBb':
      return aBNBbContract;

    case 'aBNBc':
      return aBNBcContract;

    case 'aETHb':
      return aETHbContract;

    case 'aETHc':
      return aETHcContract;

    case 'aFTMb':
      return aFTMbContract;

    case 'aFTMc':
      return aFTMcContract;

    case 'aMATICb':
      return isPolygonNetwork ? aMATICbInPolygonContract : aMATICbInETHContract;

    case 'aMATICc':
      return isPolygonNetwork ? aMATICcInPolygonContract : aMATICcInETHContract;

    case 'BNB':
    case 'ETH':
    default:
      return ETHContract;
  }
};

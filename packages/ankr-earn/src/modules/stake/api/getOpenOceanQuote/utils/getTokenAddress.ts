import { configFromEnv } from 'modules/api/config';
import { ZERO_ADDR } from 'modules/common/const';
import { Env } from 'modules/common/types';
import { Token } from 'modules/common/types/token';

import { TOpenOceanChains } from '../types';

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
  token: Token,
  network?: TOpenOceanChains,
): Address => {
  const isPolygonNetwork = network === 'polygon';

  switch (token) {
    case Token.AVAX:
      return ZERO_ADDR;

    case Token.FTM:
      return FTMContract;

    case Token.MATIC:
      return isPolygonNetwork ? MATICInPolygonContract : MATICInETHContract;

    case Token.aAVAXb:
      return aAVAXbContract;

    case Token.aAVAXc:
      return aAVAXcContract;

    case Token.aBNBb:
      return aBNBbContract;

    case Token.aBNBc:
      return aBNBcContract;

    case Token.aETHb:
      return aETHbContract;

    case Token.aETHc:
      return aETHcContract;

    case Token.aFTMb:
      return aFTMbContract;

    case Token.aFTMc:
      return aFTMcContract;

    case Token.aMATICb:
      return isPolygonNetwork ? aMATICbInPolygonContract : aMATICbInETHContract;

    case Token.aMATICc:
      return isPolygonNetwork ? aMATICcInPolygonContract : aMATICcInETHContract;

    case Token.BNB:
    case Token.ETH:
    default:
      return ETHContract;
  }
};

import {
  ANKR_NETWORK_BY_ENV,
  AVAX_NETWORK_BY_ENV,
  BSC_NETWORK_BY_ENV,
  ETH_NETWORK_BY_ENV,
  FTM_NETWORK_BY_ENV,
  GNO_NETWORK_BY_ENV,
  POLYGON_NETWORK_BY_ENV,
} from '../const';
import { Token } from '../types/token';

export const getChainIdByToken = (token: Token): number => {
  switch (token) {
    case Token.ANKR:
      return ANKR_NETWORK_BY_ENV;
    case Token.mGNO:
      return GNO_NETWORK_BY_ENV;
    case Token.AVAX:
    case Token.aAVAXb:
    case Token.aAVAXc:
      return AVAX_NETWORK_BY_ENV;
    case Token.BNB:
    case Token.aBNBb:
    case Token.aBNBc:
      return BSC_NETWORK_BY_ENV;
    case Token.FTM:
    case Token.aFTMb:
    case Token.aFTMc:
      return FTM_NETWORK_BY_ENV;
    case Token.MATIC:
    case Token.aMATICb:
    case Token.aMATICc:
      return POLYGON_NETWORK_BY_ENV;
    case Token.DOT:
    case Token.aDOTb:
    case Token.KSM:
    case Token.aKSMb:
    case Token.ETH:
    case Token.aETH:
    case Token.aETHb:
    case Token.aETHc:
    case Token.WND:
    case Token.aWNDb:
    default:
      return ETH_NETWORK_BY_ENV;
  }
};

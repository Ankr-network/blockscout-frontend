import { EEthereumNetworkId } from '@ankr.com/provider';

import {
  AVAX_NETWORK_BY_ENV,
  BSC_NETWORK_BY_ENV,
  ETH_NETWORK_BY_ENV,
  FTM_NETWORK_BY_ENV,
  SUI_NETWORK_BY_ENV,
  XDC_NETWORK_BY_ENV,
} from 'modules/common/const';
import { Token } from 'modules/common/types/token';

export const getNetworkByToken = (token: Token): EEthereumNetworkId => {
  switch (token) {
    case Token.aAVAXb:
    case Token.aAVAXc:
      return AVAX_NETWORK_BY_ENV;

    case Token.aFTMb:
    case Token.aFTMc:
      return FTM_NETWORK_BY_ENV;

    case Token.ankrXDC:
      return XDC_NETWORK_BY_ENV;

    case Token.SUI:
    case Token.ankrSUI:
      return SUI_NETWORK_BY_ENV;

    case Token.aBNBc:
    case Token.aBNBb:
      return BSC_NETWORK_BY_ENV;

    case Token.aMATICb:
    case Token.aMATICc:
    case Token.aETHb:
    case Token.aETHc:
    default:
      return ETH_NETWORK_BY_ENV;
  }
};

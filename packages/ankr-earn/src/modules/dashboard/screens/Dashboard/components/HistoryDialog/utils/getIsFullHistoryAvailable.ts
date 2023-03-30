import { advancedAPIConfig } from '@ankr.com/staking-sdk';

import { Token } from 'modules/common/types/token';

/**
 * Availability of the full history for each staking.
 *
 * @param {Token} token - Token to check
 * @return {boolean}
 */
export const getIsFullHistoryAvailable = (token: Token): boolean => {
  switch (token) {
    case Token.aAVAXb:
    case Token.aAVAXc:
      return advancedAPIConfig.isActiveForAvalanche;

    case Token.aBNBb:
    case Token.aBNBc:
      // Full history is not available for BNB.
      // This is because we need to request `isRebasing` events
      // for all period which are not supports filtration by user.
      // And its amount is too big to get them all in one request.
      return false;

    case Token.aETHb:
    case Token.aETHc:
      return advancedAPIConfig.isActiveForEth;

    case Token.aFTMb:
    case Token.aFTMc:
      return advancedAPIConfig.isActiveForFantom;

    case Token.aMATICb:
    case Token.aMATICc:
      return advancedAPIConfig.isActiveForEth;

    case Token.ankrXDC:
    default:
      return false;
  }
};

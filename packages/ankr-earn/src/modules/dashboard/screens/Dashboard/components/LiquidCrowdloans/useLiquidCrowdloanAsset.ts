import BigNumber from 'bignumber.js';

import { Token } from 'modules/common/types/token';
import { t } from 'modules/i18n/utils/intl';

interface IUseLiquidCrowdloanAsset {
  token: Token;
  network: string;
  remaining: BigNumber;
  claimable: BigNumber;
  claimLink: string;
  isLoading: boolean;
}

export const useLiquidCrowdloanAsset = (): IUseLiquidCrowdloanAsset => {
  // connect actual data

  return {
    isLoading: false,
    token: Token.aMATICb,
    network: t(`chain.1`),
    remaining: new BigNumber('0.932'),
    claimable: new BigNumber('0.932'),
    claimLink: '/',
  };
};

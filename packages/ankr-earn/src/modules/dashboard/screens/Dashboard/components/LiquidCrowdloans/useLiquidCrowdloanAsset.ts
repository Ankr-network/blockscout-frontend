import BigNumber from 'bignumber.js';

import { t } from 'common';

import { Token } from 'modules/common/types/token';

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

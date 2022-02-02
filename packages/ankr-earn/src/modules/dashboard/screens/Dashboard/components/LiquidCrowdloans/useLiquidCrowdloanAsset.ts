import BigNumber from 'bignumber.js';
import { EToken } from 'modules/dashboard/types';
import { t } from 'modules/i18n/utils/intl';

interface IUseLiquidCrowdloanAsset {
  token: EToken;
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
    token: EToken.aMATICb,
    network: t(`chain.1`),
    remaining: new BigNumber('0.932'),
    claimable: new BigNumber('0.932'),
    claimLink: '/',
  };
};

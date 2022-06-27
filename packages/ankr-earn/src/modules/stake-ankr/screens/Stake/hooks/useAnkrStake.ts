import BigNumber from 'bignumber.js';

import { t } from 'common';

import { ZERO } from 'modules/common/const';
import { RoutesConfig } from 'modules/stake-ankr/Routes';

interface IUseAnkrStake {
  loading: boolean;
  balance: BigNumber;
  tokenIn: string;
  closeHref: string;
  providerSelectHref: string;
  onSubmit: () => void;
}

export const useAnkrStake = (): IUseAnkrStake => {
  const onSubmit = () => {};

  return {
    loading: false,
    balance: ZERO,
    tokenIn: t('unit.ankr'),
    closeHref: RoutesConfig.main.generatePath(),
    providerSelectHref: RoutesConfig.selectProvider.generatePath(),
    onSubmit,
  };
};

import BigNumber from 'bignumber.js';

import { t } from 'common';

import { ZERO } from 'modules/common/const';
import { RoutesConfig } from 'modules/stake-ankr/Routes';

interface IUseAnkrStake {
  loading: boolean;
  balance: BigNumber;
  tokenIn: string;
  closeHref: string;
  onSubmit: () => void;
  onProviderSelectClick: () => void;
}

export const useAnkrStake = (): IUseAnkrStake => {
  const onSubmit = () => {};
  const onProviderSelectClick = () => {};

  return {
    loading: false,
    balance: ZERO,
    tokenIn: t('unit.ankr'),
    closeHref: RoutesConfig.main.generatePath(),
    onSubmit,
    onProviderSelectClick,
  };
};

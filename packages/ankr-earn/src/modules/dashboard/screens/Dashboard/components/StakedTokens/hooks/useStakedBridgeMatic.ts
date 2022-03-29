import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { POLYGON_NETWORK_BY_ENV, ZERO } from 'modules/common/const';
import { fetchAMATICBBridged } from 'modules/dashboard/actions/fetchAMATICBBridged';
import { t } from 'modules/i18n/utils/intl';

export interface IStakedMaticData {
  amount: BigNumber;
  network: string;
  isBalancesLoading: boolean;
  isShowed: boolean;
}

export const useStakedBridgeMaticData = (): IStakedMaticData => {
  const { data: statsData, loading: isBalancesLoading } = useQuery({
    type: fetchAMATICBBridged,
  });

  const network = t(`chain.${POLYGON_NETWORK_BY_ENV}`);
  const amount = statsData ?? ZERO;

  const isShowed = !amount.isZero() || isBalancesLoading;

  return {
    amount,
    network,
    isBalancesLoading,
    isShowed,
  };
};

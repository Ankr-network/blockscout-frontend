import { useMutation, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { featuresConfig, FTM_NETWORK_BY_ENV, ZERO } from 'modules/common/const';
import { t } from 'modules/i18n/utils/intl';
import { getCommonData } from 'modules/stake-fantom/actions/getCommonData';
import { stake } from 'modules/stake-fantom/actions/stake';
import { RoutesConfig } from 'modules/stake-fantom/Routes';

export interface IStakedAFTMBData {
  amount: BigNumber;
  pendingValue: BigNumber;
  network: string;
  stakeLink: string;
  unstakeLink?: string;
  isShowed: boolean;
  isBalancesLoading: boolean;
  isStakeLoading: boolean;
  isUnstakeLoading: boolean;
}

export const useStakedAFTMBData = (): IStakedAFTMBData => {
  const { data: commonData, loading: isBalancesLoading } = useQuery({
    type: getCommonData,
  });

  const { loading: isStakeLoading } = useMutation({
    type: stake,
  });

  const network = t(`chain.${FTM_NETWORK_BY_ENV}`);

  const amount = commonData?.aFTMbBalance ?? ZERO;
  const pendingValue = ZERO;
  const isShowed =
    !amount.isZero() || !pendingValue.isZero() || isBalancesLoading;

  return {
    amount,
    network,
    pendingValue,
    isShowed,
    isBalancesLoading,
    stakeLink: RoutesConfig.stake.generatePath(),
    unstakeLink: featuresConfig.unstakeFantom
      ? RoutesConfig.unstake.generatePath()
      : undefined,
    isStakeLoading,
    // todo: add actual isUnstakeLoading
    isUnstakeLoading: false,
  };
};

import { useQuery } from '@redux-requests/react';

import { getIsBalancePositive } from 'modules/dashboard/utils/getIsBalancePositive';
import { getTotalInfo as getTotalAnkrInfo } from 'modules/stake-ankr/actions/getTotalInfo';
import { getTotalInfo as getTotalMGnoInfo } from 'modules/stake-mgno/actions/getTotalInfo';

interface IUseDelegatedTokens {
  isDelegateAssetsShowed: boolean;
  isANKRShowed: boolean;
  isMGNOShowed: boolean;
  isDelegatedTokensLoading: boolean;
}

export const useDelegatedTokens = (): IUseDelegatedTokens => {
  const { data: totalAnkrInfo, loading: isTotalAnkrInfoLoading } = useQuery({
    type: getTotalAnkrInfo,
  });

  const { data: totalMGnoInfo, loading: isTotalMGnoInfoLoading } = useQuery({
    type: getTotalMGnoInfo,
  });

  const isANKRShowed =
    getIsBalancePositive(totalAnkrInfo?.totalDelegatedAmount) ||
    !!totalAnkrInfo?.claimableRewards.length;

  const isMGNOShowed =
    getIsBalancePositive(totalMGnoInfo?.myTotalDelegatedAmount) ||
    getIsBalancePositive(totalMGnoInfo?.myAllValidationRewards);

  const isDelegateAssetsShowed = isANKRShowed || isMGNOShowed;

  const isDelegatedTokensLoading =
    isTotalAnkrInfoLoading || isTotalMGnoInfoLoading;

  return {
    isDelegateAssetsShowed,
    isDelegatedTokensLoading,
    isANKRShowed,
    isMGNOShowed,
  };
};

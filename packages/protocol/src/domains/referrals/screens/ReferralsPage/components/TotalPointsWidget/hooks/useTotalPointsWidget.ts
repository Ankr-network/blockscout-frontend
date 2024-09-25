import { useMemo } from 'react';

import { useReferralsCount } from 'modules/referralProgram/hooks/useReferralsCount';
import { useRewardBalance } from 'modules/referralProgram/hooks/useRewardBalance';

import { ITotalPointsWidgetProps } from '../TotalPointsWidget';

export const useTotalPointsWidget = () => {
  const { isLoading: totalPointsLoading, rewardBalance } = useRewardBalance();
  const { isLoading: referralsLoading, referralsCount } = useReferralsCount();

  const activeReferrals = referralsCount?.active ?? 0;
  const totalReferrals = referralsCount?.total ?? 0;
  const totalPoints = Number(rewardBalance?.totalRewards ?? 0);

  const totalPointsWidgetProps = useMemo(
    (): ITotalPointsWidgetProps => ({
      activeReferrals,
      referralsLoading,
      totalPoints,
      totalPointsLoading,
      totalReferrals,
    }),
    [
      activeReferrals,
      referralsLoading,
      totalPoints,
      totalPointsLoading,
      totalReferrals,
    ],
  );

  return { totalPointsWidgetProps };
};

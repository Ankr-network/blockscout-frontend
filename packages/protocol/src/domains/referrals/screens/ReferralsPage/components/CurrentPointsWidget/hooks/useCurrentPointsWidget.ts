import { useMemo } from 'react';

import { useRewardBalance } from 'modules/referralProgram/hooks/useRewardBalance';

import { ICurrentPointsWidgetProps } from '../CurrentPointsWidget';

export const useCurrentPointWidget = () => {
  const { isLoading, rewardBalance } = useRewardBalance();

  const currentPoints = Number(rewardBalance?.creditBalance ?? 0);

  const currentPointsWidgetProps = useMemo(
    (): ICurrentPointsWidgetProps => ({ isLoading, currentPoints }),
    [currentPoints, isLoading],
  );

  return { currentPointsWidgetProps };
};

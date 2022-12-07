import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectSmallBalanceVisibility,
  showSmallBalances,
} from '../../store/dashboardSlice';

interface SmallBalancesControls {
  isSmallBalancesVisible: boolean;
  onBalanceVisibilityChange: (isVisible: boolean) => void;
}

export const useSmallBalances = (): SmallBalancesControls => {
  const dispatch = useDispatch();
  const isSmallBalancesVisible = useSelector(selectSmallBalanceVisibility);

  const onBalanceVisibilityChange = useCallback(
    (isVisible: boolean) => {
      dispatch(showSmallBalances(isVisible));
    },
    [dispatch],
  );

  return {
    isSmallBalancesVisible,
    onBalanceVisibilityChange,
  };
};

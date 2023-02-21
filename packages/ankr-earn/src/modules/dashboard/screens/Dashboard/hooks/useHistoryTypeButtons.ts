import { useCallback, useState } from 'react';

type THistoryType = 'staked' | 'unstaked';

interface IUseHistoryTypeButtonsData {
  isStakedActive: boolean;
  isUnstakedActive: boolean;
  onStakedClick: () => void;
  onUnstakedClick: () => void;
}

export const useHistoryTypeButtons = (): IUseHistoryTypeButtonsData => {
  const [historyType, setHistoryType] = useState<THistoryType>('staked');

  const isStakedActive = historyType === 'staked';
  const isUnstakedActive = historyType === 'unstaked';

  const onStakedClick = useCallback(() => setHistoryType('staked'), []);
  const onUnstakedClick = useCallback(() => setHistoryType('unstaked'), []);

  return {
    isStakedActive,
    isUnstakedActive,
    onStakedClick,
    onUnstakedClick,
  };
};

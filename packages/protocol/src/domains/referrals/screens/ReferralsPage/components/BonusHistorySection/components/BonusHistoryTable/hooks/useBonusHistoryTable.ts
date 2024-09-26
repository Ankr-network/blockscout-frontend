import { ERewardTxType } from 'multirpc-sdk';
import { useMemo } from 'react';

import { ERewardTxsPeriod } from 'modules/referralProgram/types';
import { useRewardTxs } from 'modules/referralProgram/hooks/useRewardTxs';

import { IBonusHistoryTableProps } from '../BonusHistoryTable';
import { useColumns } from './useColumns';

export interface IUseBonusHistoryTableProps {
  timePeriod: ERewardTxsPeriod;
}

export const useBonusHistoryTable = ({
  timePeriod,
}: IUseBonusHistoryTableProps) => {
  const {
    isLoaded: rewardTxsLoaded,
    isLoading: rewardTxsLoading,
    rewardTxs,
  } = useRewardTxs({ period: timePeriod });

  const isLoading = rewardTxsLoading && !rewardTxsLoaded;

  const { columns } = useColumns();

  const txs = useMemo(
    () => rewardTxs.filter(tx => tx.type === ERewardTxType.Reward),
    [rewardTxs],
  );

  const bonusHistoryTableProps = useMemo(
    (): IBonusHistoryTableProps => ({ columns, isLoading, txs }),
    [columns, isLoading, txs],
  );

  return { bonusHistoryTableProps };
};

import { ERewardTxType } from 'multirpc-sdk';
import { useMemo } from 'react';

import { ERewardTxsPeriod } from 'modules/referralProgram/types';
import { useRewardTxs } from 'modules/referralProgram/hooks/useRewardTxs';

import { IBonusPurposeTableProps } from '../BonusPurposeTable';
import { useColumns } from './useColumns';

export interface IUseBonusPurposeTableProps {
  timePeriod: ERewardTxsPeriod;
}

export const useBonusPurposeTable = ({
  timePeriod,
}: IUseBonusPurposeTableProps) => {
  const {
    isLoaded: rewardTxsLoaded,
    isLoading: rewardTxsLoading,
    rewardTxs,
  } = useRewardTxs({ period: timePeriod });

  const isLoading = rewardTxsLoading && !rewardTxsLoaded;

  const { columns } = useColumns();

  const txs = useMemo(
    () => rewardTxs.filter(tx => tx.type === ERewardTxType.Conversion),
    [rewardTxs],
  );

  const bonusPurposeTableProps = useMemo(
    (): IBonusPurposeTableProps => ({ columns, isLoading, txs }),
    [columns, isLoading, txs],
  );

  return { bonusPurposeTableProps };
};

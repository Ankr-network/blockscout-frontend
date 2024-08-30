import { ERewardTxType } from 'multirpc-sdk';
import { useMemo } from 'react';

import { ETimePeriod } from 'domains/referral/screens/ReferralPage/types';
import { getFromTimestampByTimePeriod } from 'domains/referral/screens/ReferralPage/utils/getFromTimestampByTimePeriod';
import { useRewardTxs } from 'modules/referralProgram/hooks/useRewardTxs';

import { IBonusHistoryTableProps } from '../BonusHistoryTable';
import { useColumns } from './useColumns';

export interface IUseBonusHistoryTableProps {
  timePeriod: ETimePeriod;
}

export const useBonusHistoryTable = ({
  timePeriod,
}: IUseBonusHistoryTableProps) => {
  const from = useMemo(
    () => getFromTimestampByTimePeriod(timePeriod),
    [timePeriod],
  );

  const { isLoading, rewardTxs } = useRewardTxs({ from });

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

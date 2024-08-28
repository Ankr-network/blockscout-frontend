import { ERewardTxType } from 'multirpc-sdk';
import { useMemo } from 'react';

import { ETimePeriod } from 'domains/referral/screens/ReferralPage/types';
import { useRewardTxs } from 'modules/referralProgram/hooks/useRewardTxs';

import { IBonusHistoryTableProps } from '../BonusHistoryTable';
import { getFromTimestampByTimePeriod } from '../utils/getFromTimestampByTimePeriod';

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

  const txs = useMemo(
    () => rewardTxs.filter(tx => tx.type === ERewardTxType.Reward),
    [rewardTxs],
  );

  const bonusHistoryTableProps = useMemo(
    (): IBonusHistoryTableProps => ({ isLoading, txs }),
    [isLoading, txs],
  );

  return { bonusHistoryTableProps };
};

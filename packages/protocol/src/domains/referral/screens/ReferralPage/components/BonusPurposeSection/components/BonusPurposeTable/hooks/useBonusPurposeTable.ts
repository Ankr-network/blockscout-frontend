import { ERewardTxType } from 'multirpc-sdk';
import { useMemo } from 'react';

import { ETimePeriod } from 'domains/referral/screens/ReferralPage/types';
import { getFromTimestampByTimePeriod } from 'domains/referral/screens/ReferralPage/utils/getFromTimestampByTimePeriod';
import { useRewardTxs } from 'modules/referralProgram/hooks/useRewardTxs';

import { IBonusPurposeTableProps } from '../BonusPurposeTable';
import { useColumns } from './useColumns';

export interface IUseBonusPurposeTableProps {
  timePeriod: ETimePeriod;
}

export const useBonusPurposeTable = ({
  timePeriod,
}: IUseBonusPurposeTableProps) => {
  const from = useMemo(
    () => getFromTimestampByTimePeriod(timePeriod),
    [timePeriod],
  );

  const { isLoading, rewardTxs } = useRewardTxs({ from });

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

import { t } from '@ankr.com/common';
import { useQuery } from '@redux-requests/react';

import { getTimeRemaining } from 'modules/common/utils/getTimeRemaining';

import { getUnstakeDate } from '../actions/getUnstakeDate';
import { UnstakableToken, UNSTAKE_DAY_INTERVALS_BY_TOKEN } from '../const';

export interface IUseUnstakePendingTimestampArgs {
  token: UnstakableToken;
}

export interface IUseUnstakePendingTimestampData {
  timestamp: number;
  label: string;
  isTimeOver: boolean;
}

export const useUnstakePendingTimestamp = ({
  token,
}: IUseUnstakePendingTimestampArgs): IUseUnstakePendingTimestampData => {
  const { data: unstakeDate } = useQuery({
    type: getUnstakeDate,
  });

  const date = unstakeDate?.[token.toLowerCase()];
  const timeRemaining = date ? getTimeRemaining(date) : { total: 0 };

  const label =
    timeRemaining && timeRemaining.total > 0
      ? t('dashboard.willGetUnstake', { token, ...timeRemaining })
      : t('dashboard.willTakeUnstake', {
          days: UNSTAKE_DAY_INTERVALS_BY_TOKEN[token],
        });

  return {
    label,
    timestamp: date ? +date : 0,
    isTimeOver: timeRemaining.total <= 0,
  };
};

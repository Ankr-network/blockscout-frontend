import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useEffect } from 'react';

import { t } from 'common';

import { getTimeRemaining } from 'modules/common/utils/getTimeRemaining';
import { useInterval } from 'modules/common/utils/useInterval';

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

const UNSTAKE_UPDATE_INTERVAL_MS = 60_000;

export const useUnstakePendingTimestamp = ({
  token,
}: IUseUnstakePendingTimestampArgs): IUseUnstakePendingTimestampData => {
  const dispatchRequest = useDispatchRequest();

  const { data: unstakeDate } = useQuery({
    type: getUnstakeDate,
  });

  useEffect(() => {
    dispatchRequest(getUnstakeDate());
  }, [dispatchRequest]);

  useInterval(() => {
    dispatchRequest(getUnstakeDate());
  }, UNSTAKE_UPDATE_INTERVAL_MS);

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

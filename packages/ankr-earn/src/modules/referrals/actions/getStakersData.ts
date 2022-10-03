import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { Token } from 'modules/common/types/token';
import { convertFromWei } from 'modules/common/utils/numbers/convertFromWei';

import { REFERRALS_ACTIONS_PREFIX } from '../api/const';
import { getStakersDataUrl } from '../api/utils/getStakersDataUrl';

interface IStakerItem {
  address: string;
  network: string;
  stakedAmount: string;
  rewards: string;
  firstStake: number;
}

interface IStakersData {
  stakers: IStakerItem[];
}

interface IStakersDataResult {
  address: string;
  network: Token;
  stakedAmount: BigNumber;
  rewards: BigNumber;
  firstStake: Date;
}

export const getStakersData = createSmartAction<
  RequestAction<IStakersData, IStakersDataResult[]>,
  [string]
>(`${REFERRALS_ACTIONS_PREFIX}getStakersData`, code => ({
  request: { url: getStakersDataUrl(code) },
  meta: {
    driver: 'axios',
    showNotificationOnError: false,
    getData: data =>
      data.stakers.map(staker => ({
        ...staker,
        network: staker.network.toUpperCase() as Token,
        stakedAmount: convertFromWei(staker.stakedAmount),
        rewards: convertFromWei(staker.rewards),
        firstStake: new Date(staker.firstStake * 1_000),
      })),
  },
}));

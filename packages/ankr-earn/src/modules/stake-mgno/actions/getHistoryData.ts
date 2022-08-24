import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { ZERO } from 'modules/common/const';

import { IHistoryData } from '../api/types';
import { MGNO_ACTIONS_PREFIX } from '../const';

const DEMO_DATA: IHistoryData[] = [
  {
    date: new Date(),
    hash: '0xasd0asd0sqa9a9sf80d8sfa0f98dsf67874',
    link: '',
    event: 'Stake',
    provider: 'Node Provider 1',
    amount: ZERO.plus(12),
  },
  {
    date: new Date(),
    hash: '0x213l12h3jh31lkj2h3lk1jh23l',
    link: '',
    event: 'Unstake',
    provider: 'Node Provider 2',
    amount: ZERO.plus(99999),
  },
];

export const getHistoryData = createAction<
  RequestAction<IHistoryData[], IHistoryData[]>
>(`${MGNO_ACTIONS_PREFIX}getHistoryData`, () => ({
  request: {
    promise: (async (): Promise<IHistoryData[]> => {
      return DEMO_DATA;
    })(),
  },
  meta: {
    showNotificationOnError: true,
  },
}));

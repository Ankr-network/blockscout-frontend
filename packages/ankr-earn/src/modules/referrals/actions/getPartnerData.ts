import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { convertFromWei } from 'modules/common/utils/numbers/convertFromWei';

import { REFERRALS_ACTIONS_PREFIX } from '../api/const';
import { getPartnerDataUrl } from '../api/utils/getPartnerDataUrl';

interface IRecordItem {
  address: string;
  network: string;
  totalStaked: string;
  rewards: string;
  daysLeft: number;
}

interface IPartnerData {
  records: IRecordItem[];
}

interface IPartnerDataResult {
  address: string;
  network: string;
  totalStaked: BigNumber;
  rewards: BigNumber;
  daysLeft: number;
}

export const getPartnerData = createSmartAction<
  RequestAction<IPartnerData, IPartnerDataResult[]>,
  [string]
>(`${REFERRALS_ACTIONS_PREFIX}getPartnerData`, code => ({
  request: { url: getPartnerDataUrl(code) },
  meta: {
    driver: 'axios',
    showNotificationOnError: false,
    getData: data =>
      data.records.map(record => ({
        ...record,
        totalStaked: convertFromWei(record.totalStaked),
        rewards: convertFromWei(record.rewards),
      })),
  },
}));

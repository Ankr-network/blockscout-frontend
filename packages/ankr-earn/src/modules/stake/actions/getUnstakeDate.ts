import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { Seconds } from 'modules/common/types';

type TData = Record<string, Date> | null;

interface IProps {
  poll?: Seconds;
}

interface IResData {
  [key: string]: {
    amountAvailable?: string;
    validationEndTime?: number;
  };
}

export const getUnstakeDate = createSmartAction<RequestAction<TData, TData>>(
  'stake/getUnstakeDate',
  ({ poll }: IProps = {}): RequestAction => ({
    request: {
      method: 'get',
      url: '/v1alpha/validation/end',
    },
    meta: {
      driver: 'axios',
      poll,
      showNotificationOnError: false,
      getData: (data: IResData): TData => {
        if (!data) return null;

        return Object.keys(data).reduce<Record<string, Date>>((acc, key) => {
          const timestamp = data[key]?.validationEndTime;

          if (typeof timestamp === 'number') {
            acc[key] = new Date(timestamp * 1_000);
          }

          return acc;
        }, {});
      },
    },
  }),
);

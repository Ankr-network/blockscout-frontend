import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

type TData = Date | null;

interface IResData {
  amountAvailable?: string;
  validationEndTime?: number;
}

export const fetchUnstakeEndDate = createSmartAction<
  RequestAction<TData, TData>
>(
  'avax/fetchUnstakeEndDate',
  (): RequestAction => ({
    request: {
      method: 'get',
      url: '/v1alpha/avax/claimservetime',
    },
    meta: {
      showNotificationOnError: true,
      driver: 'axios',
      getData: (data: IResData): TData => {
        if (typeof data?.validationEndTime !== 'number') {
          return null;
        }

        return new Date(data.validationEndTime * 1_000);
      },
    },
  }),
);

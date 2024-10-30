import { IMarkNotificationsAsReadResponse } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';
import { RootState } from 'store';

import {
  fetchPaginationNotifications,
  selectPaginationNotifications,
} from './fetchPaginationNotifications';

interface IUpdateNotificationStatusParams {
  seen: boolean;
  id: string;
}

export const {
  endpoints: { updateNotificationStatus },
  useUpdateNotificationStatusMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    updateNotificationStatus: build.mutation<
      IMarkNotificationsAsReadResponse,
      IUpdateNotificationStatusParams
    >({
      queryFn: createNotifyingQueryFn(async ({ id, seen }) => {
        const service = MultiService.getService();

        const response = await service
          .getAccountingGateway()
          .markNotificationsAsRead({ seen, ids: [id] });

        return {
          data: response,
        };
      }),
      onQueryStarted: async ({ id, seen }, { dispatch, getState }) => {
        const paginationNotificationsCurrentData =
          selectPaginationNotifications(getState() as RootState, undefined);
        const updatedNotifications = [
          ...paginationNotificationsCurrentData.notifications,
        ];

        const exectNotificationIndex = updatedNotifications.findIndex(
          notification => notification.id === id,
        );

        if (exectNotificationIndex !== -1) {
          updatedNotifications[exectNotificationIndex] = {
            ...updatedNotifications[exectNotificationIndex],
            seen: seen,
          };
        }

        dispatch(
          web3Api.util.updateQueryData(
            fetchPaginationNotifications.name as unknown as never,
            undefined as unknown as never,
            state => {
              Object.assign(state, {
                cursor: paginationNotificationsCurrentData.cursor,
                notifications: updatedNotifications,
              });
            },
          ),
        );
      },
    }),
  }),
});

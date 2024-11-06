import { IMarkNotificationsAsReadResponse } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

import { addSeenNotificationsToLocalStorage } from '../utils/addSeenNotificationsToLocalStorage';
import {
  fetchPaginationNotifications,
  selectPaginationNotifications,
} from './fetchPaginationNotifications';
import { isBroadcastNotification } from '../utils/isBroadcastNotification';
import { selectPaginationNotificationById } from '../store/selectors';

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
      queryFn: createNotifyingQueryFn(async ({ id, seen }, { getState }) => {
        const state = getState() as RootState;
        const service = MultiService.getService();
        const notification = selectPaginationNotificationById(state, id);

        if (notification && isBroadcastNotification(notification)) {
          addSeenNotificationsToLocalStorage([id]);

          return {
            data: { result: 'OK' },
          };
        }

        const response = await service
          .getAccountingGateway()
          .markNotificationsAsRead({ seen, ids: [id] });

        return {
          data: response,
        };
      }),
      onQueryStarted: async ({ id, seen }, { dispatch, getState }) => {
        const state = getState() as RootState;

        const { cursor, notifications } = selectPaginationNotifications(state);
        const notificationsCopy = [...notifications];

        const exectNotificationIndex = notifications.findIndex(
          notification => notification.id === id,
        );

        if (exectNotificationIndex !== -1) {
          notificationsCopy[exectNotificationIndex] = {
            ...notificationsCopy[exectNotificationIndex],
            seen,
          };
        }

        dispatch(
          web3Api.util.updateQueryData(
            fetchPaginationNotifications.name as unknown as never,
            undefined as unknown as never,
            queryState => {
              Object.assign(queryState, {
                cursor,
                notifications: notificationsCopy,
              });
            },
          ),
        );
      },
    }),
  }),
});

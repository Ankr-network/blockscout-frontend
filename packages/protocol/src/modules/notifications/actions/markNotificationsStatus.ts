import {
  IMarkNotificationsAsReadResponse,
  IMarkNotificationsAsReadParams,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { RequestType, web3Api } from 'store/queries';
import { RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';

import { addSeenNotificationsToLocalStorage } from '../utils/addSeenNotificationsToLocalStorage';
import {
  fetchPaginationNotifications,
  selectPaginationNotifications,
} from './fetchPaginationNotifications';
import { fetchNotifications } from './fetchNotifications';
import { isBroadcastNotification } from '../utils/isBroadcastNotification';

export const {
  endpoints: { markNotificationsStatus },
  useMarkNotificationsStatusMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    markNotificationsStatus: build.mutation<
      IMarkNotificationsAsReadResponse,
      IMarkNotificationsAsReadParams
    >({
      queryFn: createNotifyingQueryFn(async params => {
        const service = MultiService.getService();

        const response = await service
          .getAccountingGateway()
          .markNotificationsAsRead(params);

        return {
          data: response,
        };
      }),
      invalidatesTags: [RequestType.Notifications],
      onQueryStarted: async (_, { dispatch, getState, queryFulfilled }) => {
        const state = getState() as RootState;

        const { cursor, notifications } = selectPaginationNotifications(state);
        const broadcastNotificationsIds = notifications
          .filter(isBroadcastNotification)
          .map(({ id }) => id);

        if (broadcastNotificationsIds.length > 0) {
          addSeenNotificationsToLocalStorage(broadcastNotificationsIds);
        }

        dispatch(
          web3Api.util.updateQueryData(
            fetchPaginationNotifications.name as unknown as never,
            undefined as unknown as never,
            queryState => {
              Object.assign(queryState, {
                cursor,
                notifications: notifications.map(notification => ({
                  ...notification,
                  seen: true,
                })),
              });
            },
          ),
        );

        await queryFulfilled;

        dispatch(
          fetchNotifications.initiate({ limit: 15 }, { forceRefetch: true }),
        );
      },
    }),
  }),
});

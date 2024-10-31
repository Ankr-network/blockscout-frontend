import {
  IMarkNotificationsAsReadResponse,
  IMarkNotificationsAsReadParams,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { RequestType, web3Api } from 'store/queries';
import { RootState } from 'store';

import {
  fetchPaginationNotifications,
  selectPaginationNotifications,
} from './fetchPaginationNotifications';
import { fetchNotifications } from './fetchNotifications';

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
        const paginationNotificationsCurrentData =
          selectPaginationNotifications(getState() as RootState, undefined);
        const updatedNotifications = [
          ...paginationNotificationsCurrentData.notifications,
        ];

        dispatch(
          web3Api.util.updateQueryData(
            fetchPaginationNotifications.name as unknown as never,
            undefined as unknown as never,
            state => {
              Object.assign(state, {
                cursor: paginationNotificationsCurrentData.cursor,
                notifications: updatedNotifications.map(notification => ({
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

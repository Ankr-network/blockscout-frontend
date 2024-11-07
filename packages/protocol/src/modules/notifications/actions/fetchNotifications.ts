import {
  IGetNotificationsResponse,
  IGetNotificationsParams,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { RequestType, web3Api } from 'store/queries';
import { RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';

import {
  fetchPaginationNotifications,
  selectPaginationNotifications,
} from './fetchPaginationNotifications';
import { provideSeenStatusForBroadcastNotifications } from '../utils/provideSeenStatusForBroadcastNotifications';

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { fetchNotifications },
  useFetchNotificationsQuery,
  useLazyFetchNotificationsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchNotifications: build.query<
      IGetNotificationsResponse,
      IGetNotificationsParams | undefined
    >({
      queryFn: createNotifyingQueryFn(async params => {
        const service = MultiService.getService();

        const data = await service
          .getAccountingGateway()
          .getNotifications(params);

        data.notifications = provideSeenStatusForBroadcastNotifications({
          areNotificationUnseenOnly: params?.only_unseen,
          notifications: data.notifications,
        });

        return { data };
      }),
      onQueryStarted: async (
        params,
        { dispatch, getCacheEntry, getState, queryFulfilled },
      ) => {
        const { data: loadedData } = getCacheEntry();

        const { data } = await queryFulfilled;

        const isUnreadOnly = Boolean(params?.only_unseen);

        if (
          isUnreadOnly &&
          Boolean(loadedData) &&
          loadedData?.notifications.length !== data.notifications.length
        ) {
          const paginationNotificationsCurrentData =
            selectPaginationNotifications(getState() as RootState);
          const updatedNotifications = [
            ...paginationNotificationsCurrentData.notifications,
          ];

          const previousUnseenNotificationsIdsSet = new Set(
            loadedData?.notifications.map(notification => notification.id),
          );

          const newUnseeNotifications = data.notifications
            .filter(notification => {
              return !previousUnseenNotificationsIdsSet.has(notification.id);
            })
            // check is new notification message equal to current page category
            .filter(notification =>
              updatedNotifications.some(
                updatedNotification =>
                  updatedNotification.category === notification.category,
              ),
            );

          updatedNotifications.unshift(...newUnseeNotifications);

          dispatch(
            web3Api.util.updateQueryData(
              fetchPaginationNotifications.name as unknown as never,
              undefined as unknown as never,
              state => {
                Object.assign(state, {
                  cursor: paginationNotificationsCurrentData.cursor,
                  notifications: updatedNotifications.sort(
                    (a, b) => b.createdAt - a.createdAt,
                  ),
                });
              },
            ),
          );
        }
      },
      providesTags: [RequestType.Notifications],
    }),
  }),
});

export const {
  selectDataWithFallbackCachedByParams: selectNotifications,
  selectLoadingCachedByParams: selectNotificationsLoading,
  selectStateCachedByParams: selectNotificationsState,
} = createQuerySelectors({
  endpoint: fetchNotifications,
  fallback: {
    cursor: -1,
    notifications: [],
  },
});

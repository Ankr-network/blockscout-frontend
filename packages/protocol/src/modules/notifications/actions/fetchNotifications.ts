import {
  IGetNotificationsResponse,
  IGetNotificationsParams,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { RootState } from 'store';
import { RequestType, web3Api } from 'store/queries';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { hasOneFieldWithSpecificNameAndValue } from 'modules/common/utils/hasOneFieldWithSpecificNameAndValue';

import {
  fetchPaginationNotifications,
  selectPaginationNotifications,
} from './fetchPaginationNotifications';

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

        const notifications = await service
          .getAccountingGateway()
          .getNotifications(params);

        return {
          data: notifications,
        };
      }),
      onQueryStarted: async (
        params,
        { dispatch, getCacheEntry, getState, queryFulfilled },
      ) => {
        const { data: loadedData } = getCacheEntry();

        const { data } = await queryFulfilled;

        const isUnreadOnly = hasOneFieldWithSpecificNameAndValue(
          params ?? {},
          'only_unseen',
          true,
        );

        if (
          isUnreadOnly &&
          Boolean(loadedData) &&
          loadedData?.notifications.length !== data.notifications.length
        ) {
          const paginationNotificationsCurrentData =
            selectPaginationNotifications(getState() as RootState, undefined);
          const updatedNotifications = [
            ...paginationNotificationsCurrentData.notifications,
          ];

          const previousUnseenNotificationsIdsSet = new Set(
            loadedData?.notifications.map(notification => notification.id),
          );

          const newUnseeNotifications = data.notifications.filter(
            notification => {
              return !previousUnseenNotificationsIdsSet.has(notification.id);
            },
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

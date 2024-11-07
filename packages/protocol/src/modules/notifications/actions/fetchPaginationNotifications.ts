import {
  IGetNotificationsResponse,
  IGetNotificationsParams,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { web3Api } from 'store/queries';

import { provideSeenStatusForBroadcastNotifications } from '../utils/provideSeenStatusForBroadcastNotifications';

// we need the similar with 'fetchNotifications' action
// because we don't use caching for pagination
// and we need to have a merge method.
export const {
  endpoints: { fetchPaginationNotifications },
  useFetchPaginationNotificationsQuery,
  useLazyFetchPaginationNotificationsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchPaginationNotifications: build.query<
      IGetNotificationsResponse,
      IGetNotificationsParams | undefined
    >({
      queryFn: createNotifyingQueryFn(async params => {
        const api = MultiService.getService().getAccountingGateway();

        const data = await api.getNotifications(params);

        data.notifications = provideSeenStatusForBroadcastNotifications({
          areNotificationUnseenOnly: params?.only_unseen,
          notifications: data.notifications,
        });

        return { data };
      }),
      merge: (loadedData, loadingData) => {
        return {
          cursor: loadingData.cursor,
          notifications: [
            ...loadedData.notifications,
            ...loadingData.notifications,
          ],
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  selectDataWithFallback: selectPaginationNotifications,
  selectLoading: selectPaginationNotificationsLoading,
  selectState: selectPaginationNotificationsState,
} = createQuerySelectors({
  endpoint: fetchPaginationNotifications,
  fallback: {
    cursor: -1,
    notifications: [],
  },
});

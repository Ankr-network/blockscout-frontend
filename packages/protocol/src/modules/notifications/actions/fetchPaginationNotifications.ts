import {
  IGetNotificationsResponse,
  IGetNotificationsParams,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';

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
        const service = MultiService.getService();

        const notifications = await service
          .getAccountingGateway()
          .getNotifications(params);

        return {
          data: notifications,
        };
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
  selectDataWithFallbackCachedByParams: selectPaginationNotifications,
  selectLoadingCachedByParams: selectPaginationNotificationsLoading,
  selectStateCachedByParams: selectPaginationNotificationsState,
} = createQuerySelectors({
  endpoint: fetchPaginationNotifications,
  fallback: {
    cursor: -1,
    notifications: [],
  },
});

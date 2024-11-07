import { useCallback, useEffect, useMemo, useRef } from 'react';

import { ENotificationsFilter } from 'modules/notifications/const';
import { mapNotificationsToRowData } from 'modules/notifications/utils/mapNotificationsToRowData';
import {
  fetchPaginationNotifications,
  useLazyFetchPaginationNotificationsQuery,
} from 'modules/notifications/actions/fetchPaginationNotifications';
import { getNotificationsParamsByFilters } from 'modules/notifications/utils/getNotificationsParamsByFilters';
import { resetEndpoint } from 'store/utils/resetEndpoint';
import { useAppDispatch } from 'store/useAppDispatch';

interface IUseNotificationsPageDataProps {
  filter: ENotificationsFilter;
  shouldShowUnread: boolean;
}

const defaultData = {
  cursor: 0,
  notifications: [],
};

const NOTIFICATIONS_LIMIT = 15;

export const useNotificationsPageData = ({
  filter,
  shouldShowUnread,
}: IUseNotificationsPageDataProps) => {
  const dispatch = useAppDispatch();
  const [
    fetchNotifications,
    {
      data: { cursor, notifications } = defaultData,
      isError,
      isFetching,
      isLoading,
    },
  ] = useLazyFetchPaginationNotificationsQuery();

  const filterRef = useRef<ENotificationsFilter>();
  const shouldShowUnreadRef = useRef<boolean>();

  const hasMore = cursor > 0;

  const loadMore = useCallback(() => {
    if (hasMore) {
      fetchNotifications({
        ...getNotificationsParamsByFilters({ filter }),
        only_unseen: shouldShowUnread,
        cursor,
        limit: NOTIFICATIONS_LIMIT,
      });
    }
  }, [fetchNotifications, cursor, hasMore, filter, shouldShowUnread]);

  useEffect(() => {
    const isFilterChanged = filterRef.current !== filter;
    const isShouldShowUnreadChanged =
      shouldShowUnreadRef.current !== shouldShowUnread;

    const requestParams = {
      ...getNotificationsParamsByFilters({ filter }),
      only_unseen: shouldShowUnread,
      limit: NOTIFICATIONS_LIMIT,
    };

    if (isFilterChanged || isShouldShowUnreadChanged) {
      fetchNotifications(requestParams);
      resetEndpoint(fetchPaginationNotifications.name, dispatch);

      filterRef.current = filter;
      shouldShowUnreadRef.current = shouldShowUnread;
    }
  }, [fetchNotifications, dispatch, filter, shouldShowUnread]);

  const preparedNotifications = useMemo(() => {
    return notifications.map(mapNotificationsToRowData);
  }, [notifications]);

  return {
    hasMore,
    isError,
    isInitializing: isLoading,
    isLoading: isFetching,
    loadMore,
    notifications: preparedNotifications,
  };
};

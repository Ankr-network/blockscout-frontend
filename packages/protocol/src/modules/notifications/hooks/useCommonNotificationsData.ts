import { useNotifications } from './useNotifications';

export const useCommonNotificationsData = () => {
  const { notificationsAmount: unseenNotificationsAmount } = useNotifications({
    skipFetching: true,
    only_unseen: true,
  });

  return {
    unseenNotificationsAmount,
  };
};

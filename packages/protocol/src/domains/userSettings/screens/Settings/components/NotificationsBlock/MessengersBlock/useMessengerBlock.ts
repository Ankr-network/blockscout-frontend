import { useCallback, useMemo } from 'react';
import { ENotificationChannel } from 'multirpc-sdk';

import { useFetchNotificationsChannelsQuery } from 'domains/userSettings/actions/notifications/fetchNotificationsChannels';
import { useLazyFetchTelegramNotificationsBotDataQuery } from 'domains/userSettings/actions/notifications/fetchTelegramNotificationsBotData';
import { useDeleteNotificationsChannelMutation } from 'domains/userSettings/actions/notifications/deleteNotificationsChannel';

export const useMessengerBlock = () => {
  const [fetchTelegramBotData, { isFetching: isTelegramBotFetching }] =
    useLazyFetchTelegramNotificationsBotDataQuery();

  const [
    deleteNotificationsChannel,
    { isLoading: isDeleteNotificationsChannelLoading },
  ] = useDeleteNotificationsChannelMutation();

  const {
    data: notificationsChannelsData,
    isFetching: isNotificationsChannelsDataFetching,
  } = useFetchNotificationsChannelsQuery();

  const handleConnectTelegram = useCallback(async () => {
    const tgData = await fetchTelegramBotData();

    if (!tgData.error && tgData.data) {
      window.open(tgData.data.url, '_blank');
    }
  }, [fetchTelegramBotData]);

  const handleDeleteTelegram = useCallback(() => {
    deleteNotificationsChannel({ channel: ENotificationChannel.TELEGRAM });
  }, [deleteNotificationsChannel]);

  const tgUserName = useMemo(() => {
    return notificationsChannelsData?.find(
      channel => channel.channel === ENotificationChannel.TELEGRAM,
    )?.username;
  }, [notificationsChannelsData]);

  return {
    handleConnectTelegram,
    handleDeleteTelegram,
    isTelegramBotFetching,
    isDeleteNotificationsChannelLoading,
    telegramUserName: tgUserName,
    isNotificationsChannelsDataFetching,
  };
};

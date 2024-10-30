import {
  ENotificationChannel,
  IGetNotificationsChannelsResponse,
} from 'multirpc-sdk';
import { t } from '@ankr.com/common';
import { OverlaySpinner } from '@ankr.com/ui';

import { Queries } from 'modules/common/components/Queries/Queries';
import { useLazyUserSettingsFetchNotificationSettingsQuery } from 'domains/userSettings/actions/notifications/fetchNotificationSettings';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { checkChangedSignupUserSettingsAndUpdate } from 'domains/userSettings/actions/checkChangedSignupUserSettingsAndUpdate';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { useIsSMDown } from 'uiKit/Theme/useTheme';

import { NotificationsForm } from './NotificationsForm';
import { BaseSettingsBlock } from '../BaseSettingsBlock';

export const NotificationsBlock = () => {
  const [fetchNotificationSettings, notificationSettingsState] =
    useLazyUserSettingsFetchNotificationSettingsQuery();
  const [, checkSignupUserSettingsAndUpdateState] = useQueryEndpoint(
    checkChangedSignupUserSettingsAndUpdate,
  );

  const isMobile = useIsSMDown();

  useOnMount(() => {
    fetchNotificationSettings();
  });

  return (
    <BaseSettingsBlock
      title={t(
        `user-settings.notifications.${isMobile ? 'email-title' : 'title'}`,
      )}
    >
      <Queries<
        IGetNotificationsChannelsResponse[],
        IGetNotificationsChannelsResponse[]
      >
        queryStates={[
          notificationSettingsState,
          checkSignupUserSettingsAndUpdateState,
        ]}
        showLoaderDuringRefetch={false}
      >
        {(
          { data = [], isFetching },
          { data: editSettingsLastData = [], isLoading },
        ) => {
          if (isFetching || isLoading) {
            return <OverlaySpinner />;
          }

          // TODO: https://ankrnetwork.atlassian.net/browse/MRPC-5514
          const emailSettings = {
            ...data.find(
              channel => channel.channel === ENotificationChannel.EMAIL,
            )?.configs,
            ...editSettingsLastData.find(
              channel => channel.channel === ENotificationChannel.EMAIL,
            )?.configs,
          };

          return <NotificationsForm settings={emailSettings} />;
        }}
      </Queries>
    </BaseSettingsBlock>
  );
};

import { INotificationsSettings } from 'multirpc-sdk';
import { t } from '@ankr.com/common';
import { OverlaySpinner } from '@ankr.com/ui';

import { Queries } from 'modules/common/components/Queries/Queries';
import { useLazyUserSettingsFetchNotificationSettingsQuery } from 'domains/userSettings/actions/notifications/fetchNotificationSettings';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { checkChangedSignupUserSettingsAndUpdate } from 'domains/userSettings/actions/checkChangedSignupUserSettingsAndUpdate';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

import { NotificationsForm } from './NotificationsForm';
import { BaseSettingsBlock } from '../BaseSettingsBlock';

export const NotificationsBlock = () => {
  const [fetchNotificationSettings, notificationSettingsState] =
    useLazyUserSettingsFetchNotificationSettingsQuery();
  const [, checkSignupUserSettingsAndUpdateState] = useQueryEndpoint(
    checkChangedSignupUserSettingsAndUpdate,
  );

  useOnMount(() => {
    fetchNotificationSettings();
  });

  return (
    <BaseSettingsBlock title={t('user-settings.notifications.title')}>
      <Queries<INotificationsSettings, INotificationsSettings>
        queryStates={[
          notificationSettingsState,
          checkSignupUserSettingsAndUpdateState,
        ]}
        showLoaderDuringRefetch={false}
      >
        {(
          { data = {}, isFetching },
          { data: editSettingsLastData = {}, isLoading },
        ) => {
          if (isFetching || isLoading) {
            return <OverlaySpinner />;
          }

          return (
            <NotificationsForm
              settings={{ ...data, ...editSettingsLastData }}
            />
          );
        }}
      </Queries>
    </BaseSettingsBlock>
  );
};

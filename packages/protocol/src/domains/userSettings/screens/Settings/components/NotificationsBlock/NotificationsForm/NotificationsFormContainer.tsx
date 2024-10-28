import { ENotificationChannel } from 'multirpc-sdk';
import { useCallback } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { FORM_ERROR } from 'final-form';

import { FormAutoSubmit } from 'modules/form/components/FormAutoSubmit';
import { useLazyUserSettingsEditNotificationSettingsQuery } from 'domains/userSettings/actions/notifications/editNotificationSettings';

import {
  INotificationsFormProps,
  NotificationsFormData,
} from './NotificationsFormTypes';
import {
  getInitialValues,
  prepareValuesForRequest,
} from './NotificationsFormUtils';
import { NotificationsForm } from './NotificationsForm';

export const NotificationsFormContainer = ({
  settings,
}: INotificationsFormProps) => {
  const [editNotificationSettings] =
    useLazyUserSettingsEditNotificationSettingsQuery();

  const onSubmit = useCallback(
    async (data: NotificationsFormData) => {
      // TODO: https://ankrnetwork.atlassian.net/browse/MRPC-5514
      const { error } = await editNotificationSettings({
        channel: ENotificationChannel.EMAIL,
        config: prepareValuesForRequest(data),
      });

      return { [FORM_ERROR]: error };
    },
    [editNotificationSettings],
  );

  const renderForm = useCallback(
    ({ form, handleSubmit }: FormRenderProps<NotificationsFormData>) => {
      return (
        <form onSubmit={handleSubmit}>
          <FormAutoSubmit
            timeout={300}
            onSubmit={async () => {
              const resp = await handleSubmit();

              if (resp?.[FORM_ERROR]) form.reset();
            }}
          />
          <NotificationsForm />
        </form>
      );
    },
    [],
  );

  return (
    <Form
      onSubmit={onSubmit}
      render={renderForm}
      initialValues={getInitialValues(settings)}
    />
  );
};

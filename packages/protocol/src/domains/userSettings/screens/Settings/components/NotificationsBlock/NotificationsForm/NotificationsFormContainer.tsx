import React, { useCallback } from 'react';
import { Form, FormRenderProps } from 'react-final-form';

import { FORM_ERROR } from 'final-form';

import {
  INotificationsFormProps,
  NotificationsFormData,
} from './NotificationsFormTypes';
import {
  getInitialValues,
  prepareValuesForRequest,
} from './NotificationsFormUtils';
import { NotificationsForm } from './NotificationsForm';
import { FormAutoSubmit } from 'modules/form/components/FormAutoSubmit';
import { useLazyUserSettingsEditNotificationSettingsQuery } from 'domains/userSettings/actions/notifications/editNotificationSettings';

export const NotificationsFormContainer = ({
  settings,
}: INotificationsFormProps) => {
  const [editNotificationSettings] =
    useLazyUserSettingsEditNotificationSettingsQuery();

  const onSubmit = useCallback(
    async (data: NotificationsFormData) => {
      const { error } = await editNotificationSettings(
        prepareValuesForRequest(data),
      );

      return { [FORM_ERROR]: error };
    },
    [editNotificationSettings],
  );

  const renderForm = useCallback(
    ({ handleSubmit, form }: FormRenderProps<NotificationsFormData>) => {
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

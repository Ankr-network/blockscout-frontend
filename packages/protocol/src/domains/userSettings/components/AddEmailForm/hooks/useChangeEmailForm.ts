import { useCallback, useEffect } from 'react';

import { getEditEmailErrorMessage } from 'domains/userSettings/utils/getEditEmailErrorMessage';
import {
  useLazyUserSettingsEditEmailBindingQuery,
  userSettingsEditEmailBinding,
} from 'domains/userSettings/actions/email/editEmailBinding';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

import {
  AddEmailFormContentState,
  AddEmailFormFields,
  IAddEmailFormData,
} from '../types';

export interface ChangeEmailFormParams {
  onFormStateChange: (state: AddEmailFormContentState) => void;
  onFormSubmit: (data?: IAddEmailFormData) => void;
}

const useChangeEmailWatcher = (onSuccess: () => void) => {
  const [, { data }] = useQueryEndpoint(userSettingsEditEmailBinding);

  useEffect(() => {
    if (data) {
      onSuccess();
    }
  }, [data, onSuccess]);
};

export const useChangeEmailForm = ({
  onFormStateChange,
  onFormSubmit,
}: ChangeEmailFormParams) => {
  const [editEmailBinding] = useLazyUserSettingsEditEmailBindingQuery();
  const onSuccess = useCallback(() => {
    onFormStateChange(AddEmailFormContentState.SUCCESS);
  }, [onFormStateChange]);

  useChangeEmailWatcher(onSuccess);

  const onSubmit = useCallback(
    async (formData: IAddEmailFormData) => {
      onFormSubmit(formData);

      const { email } = formData;

      const { error } = await editEmailBinding({
        params: {
          params: { email },
        },
        shouldNotify: false,
      });

      const emailErrorMessage = getEditEmailErrorMessage(error, email);

      if (emailErrorMessage) {
        return {
          [AddEmailFormFields.email]: emailErrorMessage,
        };
      }

      return undefined;
    },
    [onFormSubmit, editEmailBinding],
  );

  return onSubmit;
};

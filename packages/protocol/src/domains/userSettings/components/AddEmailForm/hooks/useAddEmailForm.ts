import { useCallback, useEffect } from 'react';

import {
  useLazyUserSettingsAddNewEmailBindingQuery,
  userSettingsAddNewEmailBinding,
} from 'domains/userSettings/actions/email/addNewEmailBinding';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

import { AddEmailFormContentState, IAddEmailFormData } from '../types';
import { useAddEmailTrackingCallback } from './useAddEmailTrackingCallback';

export interface AddEmailFormParams {
  onAddEmailSubmitSuccess?: () => void;
  onFormStateChange: (state: AddEmailFormContentState) => void;
  onFormSubmit: (data: IAddEmailFormData | undefined) => void;
}

interface AddEmailWatcherParams {
  onSuccess: (email?: string) => void;
}

const useAddEmailWatcher = ({ onSuccess }: AddEmailWatcherParams) => {
  const [, { data }] = useQueryEndpoint(userSettingsAddNewEmailBinding);

  useEffect(() => {
    if (data) {
      onSuccess(data?.email);
    }
  }, [data, onSuccess]);
};

export const useAddEmailForm = ({
  onAddEmailSubmitSuccess,
  onFormStateChange,
  onFormSubmit,
}: AddEmailFormParams) => {
  const [addNewEmailBinding] = useLazyUserSettingsAddNewEmailBindingQuery();
  const trackEmailAdding = useAddEmailTrackingCallback();

  const onSuccess = useCallback(
    (email?: string) => {
      onFormStateChange(AddEmailFormContentState.SUCCESS);

      if (typeof onAddEmailSubmitSuccess === 'function') {
        onAddEmailSubmitSuccess();
      }

      if (email) {
        trackEmailAdding(email);
      }
    },
    [onFormStateChange, onAddEmailSubmitSuccess, trackEmailAdding],
  );

  useAddEmailWatcher({ onSuccess });

  const onSubmit = useCallback(
    async (formData: IAddEmailFormData) => {
      onFormSubmit(formData);
      const { email } = formData;

      await addNewEmailBinding({
        params: {
          params: { email },
        },
        shouldNotify: false,
      });
    },
    [onFormSubmit, addNewEmailBinding],
  );

  return onSubmit;
};

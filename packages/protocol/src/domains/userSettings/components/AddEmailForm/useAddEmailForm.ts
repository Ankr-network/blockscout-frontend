import { useCallback, useMemo } from 'react';

import {
  AddEmailFormContentState,
  AddEmailFormErrors,
  AddEmailFormFields,
  IAddEmailFormData,
} from './types';
import { ISuccessStepProps } from './components/SuccessStep';
import { getAddEmailErrorMessage } from 'domains/userSettings/utils/getAddEmailErrorMessage';
import { getEditEmailErrorMessage } from 'domains/userSettings/utils/getEditEmailErrorMessage';
import { useEmailErrorWithTimeout } from 'domains/userSettings/hooks/useEmailErrorWithTimeout';
import { useLazyUserSettingsAddNewEmailBindingQuery } from 'domains/userSettings/actions/email/addNewEmailBinding';
import { useLazyUserSettingsEditEmailBindingQuery } from 'domains/userSettings/actions/email/editEmailBinding';
import { useLazyUserSettingsResendConfirmationCodeQuery } from 'domains/userSettings/actions/email/resendConfirmationCode';

const ENABLE_CHANGE_EMAIL = false;

export interface IUseAddEmailFormProps {
  contentState: AddEmailFormContentState;
  formDisabled?: boolean;
  onAddEmailSubmitSuccess?: () => void;
  onFormStateChange: (state: AddEmailFormContentState) => void;
  onFormSubmit: (data: IAddEmailFormData | undefined) => void;
  submittedData: IAddEmailFormData | undefined;
}

export const useAddEmailForm = ({
  contentState,
  formDisabled,
  onAddEmailSubmitSuccess,
  onFormStateChange,
  onFormSubmit,
  submittedData,
}: IUseAddEmailFormProps) => {
  const [addNewEmailBinding] = useLazyUserSettingsAddNewEmailBindingQuery();
  const [editEmailBinding] = useLazyUserSettingsEditEmailBindingQuery();
  const [
    resendConfirmationCode,
    {
      data: resendEmailData,
      isLoading: resendEmailLoading,
      error: resendEmailError,
    },
  ] = useLazyUserSettingsResendConfirmationCodeQuery();

  const handleAddEmailSubmit = useCallback(
    async (email: string): Promise<AddEmailFormErrors> => {
      const { data, error } = await addNewEmailBinding({
        params: { email },
        shouldNotify: false,
      });

      const emailErrorMessage = getAddEmailErrorMessage(error, email);

      if (emailErrorMessage) {
        return {
          [AddEmailFormFields.email]: emailErrorMessage,
        };
      }

      if (data) {
        onFormStateChange(AddEmailFormContentState.SUCCESS);

        onAddEmailSubmitSuccess?.();
      }

      return undefined;
    },
    [addNewEmailBinding, onFormStateChange, onAddEmailSubmitSuccess],
  );

  const handleChangeEmailSubmit = useCallback(
    async (email: string): Promise<AddEmailFormErrors> => {
      const { data, error } = await editEmailBinding({
        params: { email },
        shouldNotify: false,
      });

      const emailErrorMessage = getEditEmailErrorMessage(error, email);

      if (emailErrorMessage) {
        return {
          [AddEmailFormFields.email]: emailErrorMessage,
        };
      }

      if (data) {
        onFormStateChange(AddEmailFormContentState.SUCCESS);
      }

      return undefined;
    },
    [editEmailBinding, onFormStateChange],
  );

  const onSubmit = useCallback(
    async (formData: IAddEmailFormData): Promise<AddEmailFormErrors> => {
      onFormSubmit(formData);

      if (contentState === AddEmailFormContentState.ADD_EMAIL) {
        return handleAddEmailSubmit(formData.email);
      }

      if (contentState === AddEmailFormContentState.CHANGE_EMAIL) {
        return handleChangeEmailSubmit(formData.email);
      }

      return undefined;
    },
    [contentState, handleAddEmailSubmit, handleChangeEmailSubmit, onFormSubmit],
  );

  const onResendEmail = useCallback(() => {
    if (submittedData) {
      resendConfirmationCode({
        params: { email: submittedData.email },
        shouldNotify: false,
      });
    }
  }, [resendConfirmationCode, submittedData]);

  const {
    errorMessage: resendEmailErrorMessage,
    eventHandler: handleResendEmail,
  } = useEmailErrorWithTimeout(
    resendEmailError,
    onResendEmail,
    submittedData?.email,
  );

  const onChangeEmail = useCallback(() => {
    onFormSubmit(undefined);

    onFormStateChange(AddEmailFormContentState.CHANGE_EMAIL);
  }, [onFormStateChange, onFormSubmit]);

  const successStepProps = useMemo<ISuccessStepProps>(
    () => ({
      onResendEmail: handleResendEmail,
      resendEmailData,
      resendEmailLoading,
      resendEmailErrorMessage,

      onChangeEmail: ENABLE_CHANGE_EMAIL ? onChangeEmail : undefined,
    }),
    [
      handleResendEmail,
      onChangeEmail,
      resendEmailData,
      resendEmailErrorMessage,
      resendEmailLoading,
    ],
  );

  return {
    contentState,
    formDisabled,
    onSubmit,
    submittedData,
    successStepProps,
  };
};

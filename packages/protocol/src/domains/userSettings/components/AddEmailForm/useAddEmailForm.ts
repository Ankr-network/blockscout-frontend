import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useCallback, useMemo } from 'react';

import { connect } from 'domains/auth/actions/connect';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { addNewEmailBinding } from 'domains/userSettings/actions/email/addNewEmailBinding';
import { editEmailBinding } from 'domains/userSettings/actions/email/editEmailBinding';
import { resendConfirmationCode } from 'domains/userSettings/actions/email/resendConfirmationCode';
import { useEmailErrorWithTimeout } from 'domains/userSettings/hooks/useEmailErrorWithTimeout';
import { getEmailErrorMessage } from 'domains/userSettings/utils/getEmailErrorMessage';
import { ISuccessStepProps } from './components/SuccessStep';
import {
  AddEmailFormContentState,
  AddEmailFormErrors,
  AddEmailFormFields,
  IAddEmailFormData,
} from './types';

const ENABLE_CHANGE_EMAIL = false;

export interface IUseAddEmailFormProps {
  contentState: AddEmailFormContentState;
  onFormStateChange: (state: AddEmailFormContentState) => void;
  onFormSubmit: (data: IAddEmailFormData | undefined) => void;
  onAddEmailSubmitSuccess?: () => void;
  submittedData: IAddEmailFormData | undefined;
  formDisabled?: boolean;
}

export const useAddEmailForm = ({
  contentState,
  onFormStateChange,
  onFormSubmit,
  onAddEmailSubmitSuccess,
  submittedData,
  formDisabled,
}: IUseAddEmailFormProps) => {
  const dispatchRequest = useDispatchRequest();

  const { isWalletConnected } = useAuth();

  const handleAddEmailSubmit = useCallback(
    async (email: string): Promise<AddEmailFormErrors> => {
      if (!isWalletConnected) {
        await dispatchRequest(connect());
      }

      const { data, error } = await dispatchRequest(
        addNewEmailBinding({ email }),
      );

      const emailErrorMessage = getEmailErrorMessage({ email, error });

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
    [
      dispatchRequest,
      isWalletConnected,
      onFormStateChange,
      onAddEmailSubmitSuccess,
    ],
  );

  const handleChangeEmailSubmit = useCallback(
    async (email: string): Promise<AddEmailFormErrors> => {
      const { data, error } = await dispatchRequest(
        editEmailBinding({ email }),
      );

      const emailErrorMessage = getEmailErrorMessage({ email, error });

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
    [dispatchRequest, onFormStateChange],
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
      dispatchRequest(resendConfirmationCode({ email: submittedData.email }));
    }
  }, [dispatchRequest, submittedData]);

  const {
    data: resendEmailData,
    loading: resendEmailLoading,
    error: resendEmailError,
  } = useQuery({
    type: resendConfirmationCode.toString(),
  });

  const {
    errorMessage: resendEmailErrorMessage,
    eventHandler: handleResendEmail,
  } = useEmailErrorWithTimeout(resendEmailError, onResendEmail);

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
    submittedData,
    formDisabled,
    contentState,
    onSubmit,
    successStepProps,
  };
};

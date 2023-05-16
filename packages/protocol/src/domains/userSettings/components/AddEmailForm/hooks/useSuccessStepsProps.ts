import { useCallback, useMemo } from 'react';

import { AddEmailFormContentState, IAddEmailFormData } from '../types';
import { ISuccessStepProps } from '../components/SuccessStep';
import { useEmailErrorWithTimeout } from 'domains/userSettings/hooks/useEmailErrorWithTimeout';
import { useLazyUserSettingsResendConfirmationCodeQuery } from 'domains/userSettings/actions/email/resendConfirmationCode';

const ENABLE_CHANGE_EMAIL = false;

export interface SuccessStepsPropsParams {
  onFormStateChange: (state: AddEmailFormContentState) => void;
  onFormSubmit: (data: IAddEmailFormData | undefined) => void;
  submittedEmail?: string;
}

export const useSuccessStepsProps = ({
  submittedEmail,
  onFormSubmit,
  onFormStateChange,
}: SuccessStepsPropsParams) => {
  const [
    resendConfirmationCode,
    {
      data: resendEmailData,
      isLoading: resendEmailLoading,
      error: resendEmailError,
    },
  ] = useLazyUserSettingsResendConfirmationCodeQuery();

  const onResendEmail = useCallback(() => {
    if (submittedEmail) {
      resendConfirmationCode({
        params: { email: submittedEmail },
        shouldNotify: false,
      });
    }
  }, [resendConfirmationCode, submittedEmail]);

  const {
    errorMessage: resendEmailErrorMessage,
    eventHandler: handleResendEmail,
  } = useEmailErrorWithTimeout(resendEmailError, onResendEmail, submittedEmail);

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

  return successStepProps;
};

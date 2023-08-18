import { Form } from 'react-final-form';
import { useCallback } from 'react';

import {
  useSetSignupSettings,
  useInitialValues,
  validate,
} from './SignupDialogDefaultContentUtils';
import { DefaultContentForm } from './DefaultContentForm';
import {
  SignupDialogDefaultContentProps,
  SignupFormValues,
  OauthLoginType,
} from './SignupDialogDefaultContentTypes';

export const SignupDialogDefaultContent = ({
  onGoogleButtonClick,
  onGithubButtonClick,
  setWeb3State,
}: SignupDialogDefaultContentProps) => {
  const handleSetSignupSettings = useSetSignupSettings();

  const onSubmit = useCallback(
    ({ loginType, hasMarketing }: SignupFormValues) => {
      handleSetSignupSettings(Boolean(hasMarketing));

      if (loginType === OauthLoginType.Google) {
        onGoogleButtonClick();
      } else if (loginType === OauthLoginType.Github) {
        onGithubButtonClick();
      } else {
        setWeb3State();
      }
    },
    [
      onGoogleButtonClick,
      onGithubButtonClick,
      setWeb3State,
      handleSetSignupSettings,
    ],
  );

  const initialValues = useInitialValues();

  const renderForm = useCallback(
    ({ handleSubmit }) => <DefaultContentForm handleSubmit={handleSubmit} />,
    [],
  );

  return (
    <Form<SignupFormValues>
      onSubmit={onSubmit}
      initialValues={initialValues}
      validate={validate}
      render={renderForm}
    />
  );
};

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
  SignupDialogState,
  SignupFormValues,
} from './SignupDialogDefaultContentTypes';

export const SignupDialogDefaultContent = ({
  onGoogleButtonClick,
  setWeb3State,
}: SignupDialogDefaultContentProps) => {
  const handleSetSignupSettings = useSetSignupSettings();

  const onSubmit = useCallback(
    ({ state, hasMarketing }: SignupFormValues) => {
      handleSetSignupSettings(hasMarketing);

      if (state === SignupDialogState.WEB2) {
        onGoogleButtonClick();
      } else {
        setWeb3State();
      }
    },
    [onGoogleButtonClick, setWeb3State, handleSetSignupSettings],
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

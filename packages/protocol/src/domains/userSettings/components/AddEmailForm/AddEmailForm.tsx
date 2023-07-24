import { useCallback, useMemo } from 'react';
import { FormSpy, Form, FormRenderProps } from 'react-final-form';

import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { userSettingsAddNewEmailBinding } from 'domains/userSettings/actions/email/addNewEmailBinding';
import { getAddEmailErrorMessage } from 'domains/userSettings/utils/getAddEmailErrorMessage';
import { is2FAError } from 'store/utils/is2FAError';
import { userSettingsEditEmailBinding } from 'domains/userSettings/actions/email/editEmailBinding';
import { useOnUnmount } from 'modules/common/hooks/useOnUnmount';

import { useChangeEmailForm } from './hooks/useChangeEmailForm';
import { useSuccessStepsProps } from './hooks/useSuccessStepsProps';
import {
  AddEmailFormContentState,
  AddEmailFormFields,
  IAddEmailFormData,
} from './types';
import { FillStep } from './components/FillStep';
import { useAddEmailForm } from './hooks/useAddEmailForm';
import { SuccessStep } from './components/SuccessStep';
import { initialFormData } from './const';

export interface IUseAddEmailFormProps {
  contentState: AddEmailFormContentState;
  formDisabled?: boolean;
  onAddEmailSubmitSuccess?: () => void;
  onFormStateChange: (state: AddEmailFormContentState) => void;
  onFormSubmit: (data?: IAddEmailFormData) => void;
  submittedEmail?: string;
}

let shouldValidateSubmitError = false;

export const AddEmailForm = ({
  formDisabled,
  contentState,
  onAddEmailSubmitSuccess,
  onFormStateChange,
  onFormSubmit,
  submittedEmail,
}: IUseAddEmailFormProps) => {
  const [
    ,
    { error: addEmailError, isLoading: isAddEmailLoading },
    addNewEmailReset,
  ] = useQueryEndpoint(userSettingsAddNewEmailBinding);
  const [
    ,
    { error: changeEmailError, isLoading: isChangeEmailLoading },
    changeEmailReset,
  ] = useQueryEndpoint(userSettingsEditEmailBinding);

  useOnUnmount(() => {
    shouldValidateSubmitError = false;
  });

  const onAddEmailFormSubmit = useAddEmailForm({
    onAddEmailSubmitSuccess,
    onFormStateChange,
    onFormSubmit: data => {
      shouldValidateSubmitError = true;
      onFormSubmit(data);
    },
  });

  const onChangeEmailFormSubmit = useChangeEmailForm({
    onFormStateChange,
    onFormSubmit,
  });

  const successStepProps = useSuccessStepsProps({
    onFormStateChange,
    onFormSubmit,
    submittedEmail,
  });

  const renderForm = useCallback(
    ({
      validating,
      hasValidationErrors,
      handleSubmit,
    }: FormRenderProps<IAddEmailFormData>) => {
      switch (contentState) {
        case AddEmailFormContentState.ADD_EMAIL:
        case AddEmailFormContentState.CHANGE_EMAIL:
          return (
            <>
              <FillStep
                formDisabled={formDisabled}
                handleSubmit={handleSubmit}
                isSubmitButtonDisabled={validating || hasValidationErrors}
              />
              <FormSpy
                subscription={{ modifiedSinceLastSubmit: true }}
                onChange={({ modifiedSinceLastSubmit }) => {
                  if (modifiedSinceLastSubmit) {
                    shouldValidateSubmitError = false;
                    addNewEmailReset();
                    changeEmailReset();
                  }
                }}
              />
            </>
          );

        case AddEmailFormContentState.SUCCESS:
          return <SuccessStep {...successStepProps} />;

        default:
          return null;
      }
    },
    [
      contentState,
      formDisabled,
      successStepProps,
      addNewEmailReset,
      changeEmailReset,
    ],
  );

  const onSubmit = useMemo(() => {
    if (contentState === AddEmailFormContentState.ADD_EMAIL) {
      return onAddEmailFormSubmit;
    }

    if (contentState === AddEmailFormContentState.CHANGE_EMAIL) {
      return onChangeEmailFormSubmit;
    }

    return () => undefined;
  }, [contentState, onAddEmailFormSubmit, onChangeEmailFormSubmit]);

  const validate = (values: any) => {
    const error =
      shouldValidateSubmitError && (!isAddEmailLoading || !isChangeEmailLoading)
        ? addEmailError || changeEmailError
        : null;

    if (error && !is2FAError(error)) {
      const emailErrorMessage = getAddEmailErrorMessage(error, values.email);

      return {
        [AddEmailFormFields.email]: emailErrorMessage,
      };
    }

    return {};
  };

  return (
    <Form
      initialValues={initialFormData}
      render={renderForm}
      onSubmit={onSubmit}
      validate={validate}
    />
  );
};

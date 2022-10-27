import { useAuth } from 'domains/auth/hooks/useAuth';
import { useCallback } from 'react';
import { Form, FormRenderProps } from 'react-final-form';

import { FillStep } from './components/FillStep';
import { SuccessStep } from './components/SuccessStep';
import { initialFormData } from './const';
import { AddEmailFormContentState, IAddEmailFormData } from './types';
import { IUseAddEmailFormProps, useAddEmailForm } from './useAddEmailForm';

export const AddEmailForm = (props: IUseAddEmailFormProps) => {
  const {
    contentState,
    onSubmit,
    successStepProps,
    formDisabled,
    submittedData,
  } = useAddEmailForm(props);

  const { isWalletConnected } = useAuth();

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
            <FillStep
              submittedData={submittedData}
              formDisabled={formDisabled}
              handleSubmit={handleSubmit}
              validating={validating}
              hasValidationErrors={hasValidationErrors}
              isWalletConnected={isWalletConnected}
            />
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
      submittedData,
      successStepProps,
      isWalletConnected,
    ],
  );

  return (
    <Form
      initialValues={initialFormData}
      onSubmit={onSubmit}
      render={renderForm}
    />
  );
};

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
  } = useAddEmailForm(props);

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
              handleSubmit={handleSubmit}
              validating={validating}
              hasValidationErrors={hasValidationErrors}
            />
          );

        case AddEmailFormContentState.SUCCESS:
          return <SuccessStep {...successStepProps} />;

        default:
          return null;
      }
    },
    [contentState, successStepProps],
  );

  return (
    <Form
      initialValues={initialFormData}
      onSubmit={onSubmit}
      render={renderForm}
    />
  );
};

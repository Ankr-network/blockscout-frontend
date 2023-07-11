import { Form, FormRenderProps } from 'react-final-form';
import { useCallback } from 'react';

import { NewProjectFormContent } from '../NewProjectFormContent';
import {
  NewProjectFormProps,
  NewProjectFormValues,
} from './NewProjectFormTypes';
import { useHandleSubmit } from './hooks/useHandleSubmit';
import { useInitialValues } from './hooks/useInitialValues';

export const NewProjectForm = ({
  step,
  children,
  onSubmit,
}: NewProjectFormProps) => {
  const handleFormSubmit = useHandleSubmit(step, onSubmit);

  const initialValues = useInitialValues();

  const renderForm = useCallback(
    ({ handleSubmit }: FormRenderProps<NewProjectFormValues>) => {
      return (
        <form onSubmit={handleSubmit}>
          <NewProjectFormContent step={step} />
          {children}
        </form>
      );
    },
    [step, children],
  );

  return (
    <Form
      onSubmit={handleFormSubmit}
      render={renderForm}
      initialValues={initialValues}
    />
  );
};

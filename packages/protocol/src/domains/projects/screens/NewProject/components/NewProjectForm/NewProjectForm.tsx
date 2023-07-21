import { Form, FormRenderProps } from 'react-final-form';
import { useCallback } from 'react';

import { NewProjectStep } from 'domains/projects/types';

import { NewProjectFormContent } from '../NewProjectFormContent';
import {
  NewProjectFormProps,
  NewProjectFormValues,
} from './NewProjectFormTypes';
import { useHandleSubmit } from './hooks/useHandleSubmit';
import { useInitialValues } from './hooks/useInitialValues';
import { Footer } from '../Footer';

export const NewProjectForm = ({
  step,
  onSubmit,
  onBackClick,
  isLoading,
}: NewProjectFormProps) => {
  const handleFormSubmit = useHandleSubmit(step, onSubmit);

  const initialValues = useInitialValues();

  const renderForm = useCallback(
    ({
      form: { getState },
      handleSubmit,
    }: FormRenderProps<NewProjectFormValues>) => {
      const selectedChain = getState().values?.chainId;

      return (
        <form onSubmit={handleSubmit}>
          <NewProjectFormContent step={step} />
          <Footer
            isNextButtonDisabled={
              step === NewProjectStep.Chain && !selectedChain
            }
            onBackClick={onBackClick}
            isLoading={isLoading}
          />
        </form>
      );
    },
    [step, onBackClick, isLoading],
  );

  return (
    <Form
      onSubmit={handleFormSubmit}
      render={renderForm}
      initialValues={initialValues}
    />
  );
};

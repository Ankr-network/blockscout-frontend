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
  setCurrentStep,
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
      const {
        selectedMainnetIds,
        selectedTestnetIds,
        selectedDevnetIds,
        selectedBeaconMainnetIds,
        selectedBeaconTestnetIds,
        selectedOpnodeMainnetIds,
        selectedOpnodeTestnetIds,
        whitelistItems,
      } = getState().values || {};

      const isChainSelected = Boolean(
        selectedMainnetIds?.length ||
          selectedTestnetIds?.length ||
          selectedDevnetIds?.length ||
          selectedBeaconMainnetIds?.length ||
          selectedBeaconTestnetIds?.length ||
          selectedOpnodeMainnetIds?.length ||
          selectedOpnodeTestnetIds?.length,
      );
      const isWhitelistEmpty = whitelistItems?.length === 0;

      return (
        <form onSubmit={handleSubmit}>
          <NewProjectFormContent step={step} setCurrentStep={setCurrentStep} />
          <Footer
            isNextButtonDisabled={
              (step === NewProjectStep.Chain && !isChainSelected) ||
              (step === NewProjectStep.Whitelist && isWhitelistEmpty)
            }
            onBackClick={onBackClick}
            isLoading={isLoading}
          />
        </form>
      );
    },
    [step, setCurrentStep, onBackClick, isLoading],
  );

  return (
    <Form
      onSubmit={handleFormSubmit}
      render={renderForm}
      initialValues={initialValues}
    />
  );
};

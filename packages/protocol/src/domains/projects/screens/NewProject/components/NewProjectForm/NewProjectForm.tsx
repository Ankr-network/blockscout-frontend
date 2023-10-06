import { Form, FormRenderProps } from 'react-final-form';
import { useCallback } from 'react';
import { Paper } from '@mui/material';

import { NewProjectStep } from 'domains/projects/types';

import { NewProjectFormContent } from '../NewProjectFormContent';
import {
  NewProjectFormProps,
  NewProjectFormValues,
} from './NewProjectFormTypes';
import { useHandleSubmit } from './hooks/useHandleSubmit';
import { useInitialValues } from './hooks/useInitialValues';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { useNewProjectFormStyles } from './useNewProjectFormStyles';

export const NewProjectForm = ({
  step,
  onSubmit,
  onBackClick,
  isLoading,
}: NewProjectFormProps) => {
  const { classes } = useNewProjectFormStyles();
  const handleFormSubmit = useHandleSubmit(step, onSubmit);

  const initialValues = useInitialValues();

  const renderForm = useCallback(
    ({
      form: { getState },
      handleSubmit,
    }: FormRenderProps<NewProjectFormValues>) => {
      const {
        name,
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

      const isNextButtonDisabled =
        (step === NewProjectStep.General && !name) ||
        (step === NewProjectStep.Chains && !isChainSelected);

      return (
        <form onSubmit={handleSubmit}>
          <div className={classes.contentWrapper}>
            <Paper className={classes.root}>
              <Header step={step} />
              <NewProjectFormContent step={step} />
            </Paper>
          </div>
          <Footer
            step={step}
            isNextButtonDisabled={isNextButtonDisabled}
            onBackClick={onBackClick}
            shouldShowSkipButton={
              step === NewProjectStep.Whitelist &&
              (!whitelistItems || whitelistItems?.length === 0)
            }
            isLoading={isLoading}
          />
        </form>
      );
    },
    [step, classes.contentWrapper, classes.root, onBackClick, isLoading],
  );

  return (
    <Form
      onSubmit={handleFormSubmit}
      render={renderForm}
      initialValues={initialValues}
    />
  );
};

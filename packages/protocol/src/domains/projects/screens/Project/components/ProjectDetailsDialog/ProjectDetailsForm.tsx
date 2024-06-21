import React, { useCallback } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { FormControl, InputLabel } from '@mui/material';
import { t } from '@ankr.com/common';
import { LoadingButton } from '@ankr.com/ui';

import { InputDialogFormField } from 'modules/common/components/InputDialogFormField';
import { validateAscii } from 'modules/common/utils/validateAscii';
import {
  MAX_PROJECT_DESCRIPTION_LENGTH,
  MAX_PROJECT_NAME_LENGTH,
} from 'domains/projects/const';

import { ProjectDetailsFormFields, ProjectDetailsFormValues } from './types';
import { useProjectDetailsDialogStyles } from './useProjectDetailsDialogStyles';

interface ProjectDetailsFormProps {
  projectName?: string;
  projectDescription?: string;
  isUpdateLoading?: boolean;
  handleFormSubmit: (
    values: ProjectDetailsFormValues,
    form: unknown,
  ) => Promise<void>;
  isDescriptionFocusedByDefault?: boolean;
}

export const ProjectDetailsForm = ({
  handleFormSubmit,
  isDescriptionFocusedByDefault,
  isUpdateLoading,
  projectDescription,
  projectName,
}: ProjectDetailsFormProps) => {
  const { classes } = useProjectDetailsDialogStyles();

  const renderForm = useCallback(
    ({ form, handleSubmit }: FormRenderProps<ProjectDetailsFormValues>) => {
      const { name } = form.getState().values;

      const isNameFilled = Boolean(name);

      return (
        <form className={classes.formContent} onSubmit={handleSubmit}>
          <FormControl>
            <InputLabel className={classes.label}>
              {t('projects.new-project.step-1.name-field')}
            </InputLabel>
            <InputDialogFormField
              name={ProjectDetailsFormFields.name}
              maxLength={MAX_PROJECT_NAME_LENGTH}
              validate={validateAscii}
              placeholder={t('projects.new-project.step-1.name-placeholder')}
            />
          </FormControl>

          <FormControl>
            <InputLabel className={classes.label}>
              {t('projects.new-project.step-1.description-field')}
            </InputLabel>
            <InputDialogFormField
              autofocus={isDescriptionFocusedByDefault}
              className={classes.description}
              isLimitCounterVisible
              isHelperTextVisible
              isMultiline
              name={ProjectDetailsFormFields.description}
              maxLength={MAX_PROJECT_DESCRIPTION_LENGTH}
              validate={validateAscii}
              placeholder={t(
                'projects.new-project.step-1.description-placeholder',
              )}
            />
          </FormControl>

          <LoadingButton
            fullWidth
            loading={isUpdateLoading}
            size="large"
            disabled={!isNameFilled}
            className={classes.submitButton}
            onClick={handleSubmit}
          >
            {t('projects.new-project.step-1.save')}
          </LoadingButton>
        </form>
      );
    },
    [classes, isUpdateLoading, isDescriptionFocusedByDefault],
  );

  return (
    <Form
      onSubmit={handleFormSubmit}
      render={renderForm}
      initialValues={{
        [ProjectDetailsFormFields.name]: projectName,
        [ProjectDetailsFormFields.description]: projectDescription,
      }}
    />
  );
};

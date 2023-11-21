import { FormControl, InputLabel } from '@mui/material';
import { t } from '@ankr.com/common';

import { InputDialogFormField } from 'modules/common/components/InputDialogFormField';
import { validateAscii } from 'modules/common/utils/validateAscii';
import { GeneralStepFields } from 'domains/projects/store';
import {
  MAX_PROJECT_DESCRIPTION_LENGTH,
  MAX_PROJECT_NAME_LENGTH,
} from 'domains/projects/const';

import { useAddProjectFormStyles } from './useAddProjectFormStyles';

export const AddProjectForm = () => {
  const { classes } = useAddProjectFormStyles();

  return (
    <>
      <FormControl className={classes.root}>
        <InputLabel className={classes.label}>
          {t('projects.new-project.step-1.name-field')}
        </InputLabel>
        <InputDialogFormField
          name={GeneralStepFields.name}
          maxLength={MAX_PROJECT_NAME_LENGTH}
          validate={validateAscii}
          placeholder={t('projects.new-project.step-1.name-placeholder')}
        />
      </FormControl>

      <FormControl className={classes.root}>
        <InputLabel className={classes.label}>
          {t('projects.new-project.step-1.description-field')}
        </InputLabel>
        <InputDialogFormField
          isMultiline
          isLimitCounterVisible
          isHelperTextVisible
          name={GeneralStepFields.description}
          maxLength={MAX_PROJECT_DESCRIPTION_LENGTH}
          className={classes.description}
          validate={validateAscii}
          placeholder={t('projects.new-project.step-1.description-placeholder')}
        />
      </FormControl>
    </>
  );
};

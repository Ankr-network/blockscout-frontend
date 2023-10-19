import { FormControl, InputLabel } from '@mui/material';
import { t } from '@ankr.com/common';

import { InputDialogFormField } from 'modules/common/components/InputDialogFormField';
import { validateAscii } from 'modules/common/utils/validateAscii';
import { GeneralStepFields } from 'domains/projects/store';

import { useAddProjectFormStyles } from './useAddProjectFormStyles';

const MAX_DESCRIPTION_LENGTH = 150;
const MAX_NAME_LENGTH = 30;

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
          maxLength={MAX_NAME_LENGTH}
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
          maxLength={MAX_DESCRIPTION_LENGTH}
          className={classes.description}
          validate={validateAscii}
          placeholder={t('projects.new-project.step-1.description-placeholder')}
        />
      </FormControl>
    </>
  );
};

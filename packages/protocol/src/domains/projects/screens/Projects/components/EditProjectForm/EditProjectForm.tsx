import { FormControl, InputLabel } from '@mui/material';
import { t } from '@ankr.com/common';

import { InputDialogFormField } from 'modules/common/components/InputDialogFormField';
import { validateAscii } from 'modules/common/utils/validateAscii';
import { GeneralStepFields } from 'domains/projects/store';
import { LoadingButton } from 'uiKit/LoadingButton';

import { useEditProjectFormStyles } from './useEditProjectFormStyles';
import { useProjectFormValues } from '../../hooks/useProjectFormValues';

const MAX_NAME_LENGTH = 30;

interface EditProjectFormProps {
  isLoading: boolean;
  handleSubmit: () => void;
}

export const EditProjectForm = ({
  isLoading,
  handleSubmit,
}: EditProjectFormProps) => {
  const { classes } = useEditProjectFormStyles();

  const { name, valid } = useProjectFormValues();

  const isNameFilled = Boolean(name);

  return (
    <form onSubmit={handleSubmit}>
      <FormControl className={classes.root}>
        <InputLabel className={classes.label}>
          {t('projects.rename-dialog.name-field')}
        </InputLabel>
        <InputDialogFormField
          name={GeneralStepFields.name}
          maxLength={MAX_NAME_LENGTH}
          validate={validateAscii}
          placeholder={t('projects.rename-dialog.name-placeholder')}
        />
      </FormControl>

      <LoadingButton
        fullWidth
        loading={isLoading}
        size="large"
        disabled={!isNameFilled || !valid}
        className={classes.submitButton}
        onClick={handleSubmit}
      >
        {t('projects.rename-dialog.save')}
      </LoadingButton>
    </form>
  );
};

import { FormControl, InputLabel } from '@mui/material';
import { t } from '@ankr.com/common';
import { LoadingButton } from '@ankr.com/ui';

import { InputDialogFormField } from 'modules/common/components/InputDialogFormField';
import { validateAscii } from 'modules/common/utils/validateAscii';

import { useAddAndEditProjectFormStyles } from './useAddAndEditProjectFormStyles';
import { AddAndEditProjectDialogFields } from './AddAndEditProjectFormUtils';
import { useProjectFormValues } from '../../hooks/useProjectFormValues';

interface AddAndEditProjectFormProps {
  isLoading: boolean;
  handleSubmit: () => void;
}

export const AddAndEditProjectForm = ({
  isLoading,
  handleSubmit,
}: AddAndEditProjectFormProps) => {
  const { classes, cx } = useAddAndEditProjectFormStyles();

  const { name, valid } = useProjectFormValues();

  const isNameFilled = Boolean(name);

  return (
    <form onSubmit={handleSubmit}>
      <FormControl className={cx(classes.formWrapper, classes.inputWrapper)}>
        <InputLabel className={classes.label}>
          {t('projects.new-project.dialog.name-field')}
        </InputLabel>
        <InputDialogFormField
          name={AddAndEditProjectDialogFields.name}
          maxLength={30}
          validate={validateAscii}
          placeholder={t('projects.new-project.dialog.name-placeholder')}
        />
      </FormControl>

      <FormControl className={cx(classes.formWrapper, classes.inputWrapper)}>
        <InputLabel className={classes.label}>
          {t('projects.new-project.dialog.description-field')}
        </InputLabel>
        <InputDialogFormField
          isMultiline
          name={AddAndEditProjectDialogFields.description}
          maxLength={150}
          validate={validateAscii}
          placeholder={t('projects.new-project.dialog.description-placeholder')}
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
        {t('projects.edit-project.dialog.save')}
      </LoadingButton>
    </form>
  );
};

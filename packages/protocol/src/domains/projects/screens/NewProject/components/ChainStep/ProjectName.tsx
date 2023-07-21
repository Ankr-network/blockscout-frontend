import { Field } from 'react-final-form';
import { t } from '@ankr.com/common';

import { ChainStepFields } from 'domains/projects/store';
import { InputField } from 'modules/form/components/InputField';

import { useChainStepStyles } from './useChainStepStyles';

export const ProjectName = () => {
  const { classes } = useChainStepStyles();

  return (
    <Field
      component={InputField}
      name={ChainStepFields.projectName}
      placeholder={t('projects.new-project.step-1.chainsPlaceholder')}
      label={t('projects.new-project.step-1.name')}
      disabled
      className={classes.projectName}
      InputProps={{
        className: classes.nameInput,
        readOnly: true,
      }}
    />
  );
};

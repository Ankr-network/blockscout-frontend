import { t } from '@ankr.com/common';
import { FormGroup, Typography } from '@mui/material';
import { Field } from 'react-final-form';

import { InputField } from 'modules/form/components/InputField';
import { jwtTokenIntlRoot } from 'domains/jwtToken/utils/utils';

import { useNameFiledStyles } from './useNameFiledStyles';

interface INameFieldProps {
  projectName: string;
}

export const NameField = ({ projectName }: INameFieldProps) => {
  const { classes } = useNameFiledStyles();

  return (
    <FormGroup className={classes.group}>
      <Typography className={classes.title}>
        {t(`${jwtTokenIntlRoot}.name`)}
      </Typography>
      <Field
        className={classes.field}
        component={InputField}
        name="name"
        placeholder={projectName}
        disabled
      />
    </FormGroup>
  );
};

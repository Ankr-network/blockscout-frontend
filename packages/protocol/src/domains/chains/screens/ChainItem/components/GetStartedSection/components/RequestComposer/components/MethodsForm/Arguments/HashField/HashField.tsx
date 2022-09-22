import { Field } from 'react-final-form';
import { FieldValidator } from 'final-form';
import { FormGroup, Typography } from '@material-ui/core';
import { useCallback } from 'react';

import { InputField } from 'modules/form/components/InputField';
import { useEVMMethodsFormStyles } from '../../MethodsFormStyles';

interface HashFieldProps {
  helperText: string;
  name: string;
  placeholder?: string;
  validate: (value: string) => boolean;
}

const InputProps = {
  multiline: true,
};

export const HashField = ({
  helperText,
  name,
  placeholder,
  validate: isValid = () => true,
}: HashFieldProps) => {
  const classes = useEVMMethodsFormStyles();

  const validate: FieldValidator<string> = useCallback(
    value => !isValid(value),
    [isValid],
  );

  return (
    <FormGroup className={classes.blockNumber}>
      <Field
        component={InputField}
        name={name}
        variant="outlined"
        placeholder={placeholder}
        InputProps={InputProps}
        helperText={
          <Typography
            variant="subtitle1"
            className={classes.label}
            component="span"
          >
            {helperText}
          </Typography>
        }
        validate={validate}
      />
    </FormGroup>
  );
};

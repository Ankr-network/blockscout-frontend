import React, { useCallback } from 'react';
import { Field } from 'react-final-form';
import { FieldValidator } from 'final-form';
import { FormGroup, Typography } from '@material-ui/core';

import { InputField } from 'modules/form/components/InputField';
import { useEVMMethodsFormStyles } from '../../MethodsFormStyles';

interface BlockNumberFieldProps {
  helperText: string;
  name: string;
  placeholder?: string;
  validate?: (value: string) => boolean;
}

export const BlockNumberField = ({
  helperText,
  placeholder,
  name = '',
  validate: isValid = () => true,
}: BlockNumberFieldProps) => {
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

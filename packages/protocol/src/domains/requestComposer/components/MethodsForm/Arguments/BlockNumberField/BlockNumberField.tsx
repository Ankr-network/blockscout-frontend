import React, { useCallback } from 'react';
import { Field } from 'react-final-form';
import { FieldValidator } from 'final-form';
import { FormGroup, Typography } from '@material-ui/core';

import { InputField } from 'modules/form/components/InputField';
import { useEVMMethodsFormStyles } from '../../MethodsFormStyles';

interface BlockNumberFieldProps {
  helperText: string;
  name: string;
  type?: string;
  placeholder?: string;
  validate?: (value: string | number) => boolean;
}

export const BlockNumberField = ({
  helperText,
  placeholder,
  name = '',
  type = 'text',
  validate: isValid = () => true,
}: BlockNumberFieldProps) => {
  const classes = useEVMMethodsFormStyles();

  const validate: FieldValidator<string | number> = useCallback(
    value => !isValid(value),
    [isValid],
  );

  const parse = useCallback(
    value => {
      if (type === 'number' && value) {
        return Number(value);
      }

      return value;
    },
    [type],
  );

  return (
    <FormGroup className={classes.blockNumber}>
      <Field
        component={InputField}
        name={name}
        type={type}
        variant="outlined"
        placeholder={placeholder}
        parse={parse}
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

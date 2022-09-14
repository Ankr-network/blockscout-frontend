import React from 'react';
import { FormGroup, Typography } from '@material-ui/core';
import { Field } from 'react-final-form';

import { InputField } from 'modules/form/components/InputField';
import { useEVMMethodsFormStyles } from '../../MethodsFormStyles';

interface BlockNumberFieldProps {
  helperText: string;
  placeholder?: string;
  name: string;
}

export const BlockNumberField = ({
  helperText,
  placeholder,
  name = '',
}: BlockNumberFieldProps) => {
  const classes = useEVMMethodsFormStyles();

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
      />
    </FormGroup>
  );
};

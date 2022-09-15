import React from 'react';
import { FormGroup, Typography } from '@material-ui/core';
import { Field } from 'react-final-form';

import { useEVMMethodsFormStyles } from '../../MethodsFormStyles';
import { CheckboxField } from 'modules/form/components/CheckboxField';

interface CheckboxProps {
  helperText: string;
  name: string;
}

export const Checkbox = ({ helperText, name }: CheckboxProps) => {
  const classes = useEVMMethodsFormStyles();

  return (
    <FormGroup className={classes.blockNumber}>
      <Field
        component={CheckboxField}
        name={name}
        type="checkbox"
        label={
          <Typography
            variant="caption"
            className={classes.checkboxLabel}
            color="textSecondary"
          >
            {helperText}
          </Typography>
        }
      />
    </FormGroup>
  );
};

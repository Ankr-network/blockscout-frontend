import React from 'react';
import { Button } from '@mui/material';
import { Field } from 'react-final-form';

import { InputField } from 'modules/form/components/InputField/InputField';

import { useStyles } from './AddressInputFieldStyles';

interface AddressInputFieldProps {
  name: string;
  validate: (value: string) => string | undefined;
  onButtonClick: () => void;
  buttonText: string;
  isDisabled: boolean;
}

export const AddressInputField = ({
  buttonText,
  isDisabled,
  name,
  onButtonClick,
  validate,
}: AddressInputFieldProps) => {
  const { classes } = useStyles();

  return (
    <Field
      component={InputField}
      name={name}
      className={classes.domain}
      variant="outlined"
      validate={(data, allValues, meta) => !meta?.pristine && validate(data)}
      InputProps={{
        classes: {
          root: classes.inputBase,
        },
        disabled: isDisabled,
        endAdornment: (
          <Button
            variant="text"
            className={classes.addButton}
            onClick={onButtonClick}
            disabled={isDisabled}
          >
            {buttonText}
          </Button>
        ),
      }}
      // eslint-disable-next-line
      inputProps={{ maxLength: 128 }}
    />
  );
};

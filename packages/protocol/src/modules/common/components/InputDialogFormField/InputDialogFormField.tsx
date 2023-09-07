import { Field } from 'react-final-form';
import { useCallback } from 'react';

import { InputField } from 'modules/form/components/InputField/InputField';

import { useInputDialogFormStyles } from './useInputDialogFormStyles';

interface InputDialogFormFieldProps {
  name: string;
  placeholder: string;
  maxLength?: number;
  validate?: (value: string, allValues?: unknown) => string | undefined;
  isMultiline?: boolean;
  isDisabled?: boolean;
}

export const InputDialogFormField = ({
  name,
  placeholder,
  maxLength = 128,
  isMultiline,
  isDisabled,
  validate,
}: InputDialogFormFieldProps) => {
  const { classes } = useInputDialogFormStyles({ isMultiline });

  const handleValidate = useCallback(
    (data, allValues, meta) => {
      return (
        !meta?.pristine &&
        typeof validate === 'function' &&
        validate(data, allValues)
      );
    },
    [validate],
  );

  return (
    <Field
      component={InputField}
      name={name}
      placeholder={placeholder}
      className={classes.domain}
      variant="outlined"
      type="textarea"
      multiline={isMultiline}
      validate={handleValidate}
      InputProps={{
        classes: {
          root: classes.inputBase,
        },
        disabled: isDisabled,
      }}
      // we need it to add maxLength exactly to inputProps.
      // passing maxLength in InputProps doesn't work
      // eslint-disable-next-line react/jsx-no-duplicate-props
      inputProps={{ maxLength }}
    />
  );
};

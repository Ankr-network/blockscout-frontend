import { Field } from 'react-final-form';
import { useCallback } from 'react';

import { InputField } from 'modules/form/components/InputField/InputField';

import { useInputDialogFormStyles } from './useInputDialogFormStyles';

interface InputDialogFormFieldProps {
  name: string;
  placeholder: string;
  maxLength?: number;
  isMultiline?: boolean;
  isRequired?: boolean;
  shouldSkipPristineForValidation?: boolean;
  isDisabled?: boolean;
  isHelperTextVisible?: boolean;
  isLimitCounterVisible?: boolean;
  className?: string;
  validate?: (value: string, allValues?: unknown) => string | undefined;
}

export const InputDialogFormField = ({
  name,
  placeholder,
  maxLength = 128,
  isMultiline,
  isRequired,
  shouldSkipPristineForValidation = false,
  isDisabled,
  isHelperTextVisible = false,
  isLimitCounterVisible = false,
  className,
  validate,
}: InputDialogFormFieldProps) => {
  const { classes, cx } = useInputDialogFormStyles({ isMultiline });

  const handleValidate = useCallback(
    (data, allValues, meta) =>
      (!meta?.pristine || shouldSkipPristineForValidation) &&
      typeof validate === 'function' &&
      validate(data),
    [shouldSkipPristineForValidation, validate],
  );

  return (
    <Field
      isRequired={isRequired}
      isHelperTextVisible={isHelperTextVisible}
      isLimitCounterVisible={isLimitCounterVisible}
      component={InputField}
      name={name}
      placeholder={placeholder}
      className={cx(classes.domain, className)}
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

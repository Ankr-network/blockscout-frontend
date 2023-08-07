import { Field } from 'react-final-form';

import { InputField } from 'modules/form/components/InputField/InputField';

import { useInputAddressStyles } from './useInputAddressStyles';

interface InputAddressFieldProps {
  name: string;
  placeholder: string;
  validate: (value: string) => string | undefined;
  isDisabled: boolean;
}

export const InputAddressField = ({
  name,
  placeholder,
  validate,
  isDisabled,
}: InputAddressFieldProps) => {
  const { classes } = useInputAddressStyles();

  return (
    <Field
      component={InputField}
      name={name}
      placeholder={placeholder}
      className={classes.domain}
      variant="outlined"
      validate={(data, allValues, meta) => !meta?.pristine && validate(data)}
      InputProps={{
        classes: {
          root: classes.inputBase,
        },
        disabled: isDisabled,
      }}
      // we need it to add maxLength exactly to inputProps.
      // passing maxLength in InputProps doesn't work
      // eslint-disable-next-line react/jsx-no-duplicate-props
      inputProps={{ maxLength: 128 }}
    />
  );
};

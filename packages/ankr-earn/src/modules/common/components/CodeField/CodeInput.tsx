import { Field } from 'react-final-form';

import { useValidateCode } from 'modules/common/hooks/useValidateCode';
import { AmountField } from 'uiKit/AmountField';

interface ICodeInputProps {
  disabled?: boolean;
  name?: string;
  inputClassName?: string;
}

export const CodeInput = ({
  disabled = false,
  name = 'code',
  inputClassName,
}: ICodeInputProps): JSX.Element => {
  const validateCode = useValidateCode();

  return (
    <Field
      fullWidth
      isIntegerOnly
      component={AmountField}
      disabled={disabled}
      InputProps={{
        classes: {
          input: inputClassName,
        },
      }}
      label=""
      name={name}
      placeholder=""
      validate={validateCode}
      variant="outlined"
    />
  );
};

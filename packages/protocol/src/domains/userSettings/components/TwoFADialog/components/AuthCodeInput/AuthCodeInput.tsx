import AuthCode from 'react-auth-code-input';

import { useAuthCodeInputStyles } from './AuthCodeInputStyles';

interface AuthCodeInputProps {
  onChange: (value: string) => void;
  hasError: boolean;
}

export const AuthCodeInput = ({ onChange, hasError }: AuthCodeInputProps) => {
  const { classes } = useAuthCodeInputStyles(hasError);

  return (
    <AuthCode
      allowedCharacters="numeric"
      onChange={onChange}
      containerClassName={classes.container}
      inputClassName={classes.input}
    />
  );
};

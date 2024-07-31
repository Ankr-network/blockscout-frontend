import {
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
} from 'react';
import { TextField } from '@ankr.com/ui';

import { useReferralCodeInputStyles } from './useReferralCodeInputStyles';

export interface IReferralCodeInputProps {
  error?: string;
  isDisabled?: boolean;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  value?: string;
}

export const ReferralCodeInput = ({
  error,
  isDisabled,
  onBlur,
  onChange,
  onKeyDown,
  value,
}: IReferralCodeInputProps) => {
  const { classes } = useReferralCodeInputStyles();

  return (
    <TextField
      InputProps={{ classes }}
      autoFocus
      disabled={isDisabled}
      error={Boolean(error)}
      helperText={error}
      onBlurCapture={onBlur}
      onChange={onChange}
      onKeyDown={onKeyDown}
      value={value}
    />
  );
};

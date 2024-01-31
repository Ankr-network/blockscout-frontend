import { ChangeEvent } from 'react';
import { TextField } from '@ankr.com/ui';
import { Typography } from '@mui/material';

import { useConfirmInputStyles } from './useConfirmInputStyles';

interface ConfirmInputProps {
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  onChangeValue: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const ConfirmInput = ({
  label,
  placeholder,
  value,
  error,
  onChangeValue,
}: ConfirmInputProps) => {
  const { classes } = useConfirmInputStyles();

  return (
    <TextField
      fullWidth
      label={label}
      value={value}
      onChange={onChangeValue}
      placeholder={placeholder}
      InputProps={{
        size: 'medium',
        error: Boolean(error),
      }}
      helperText={
        <Typography
          variant="caption"
          className={classes.confirmDataTransferDialogErrorText}
        >
          {error}
        </Typography>
      }
    />
  );
};

import React, { ReactNode } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FormControlLabel, Typography, Checkbox } from '@mui/material';
import { ChainID } from '@ankr.com/chains-list';

import { useChainItemStyles } from './useChainItemStyles';

interface IChainItemProps extends FieldRenderProps<ChainID> {
  label: string;
  disabled?: boolean;
  children?: ReactNode;
}

export const ChainItem = ({
  className = '',
  disabled,
  input,
  label,
}: IChainItemProps) => {
  const isChecked = Boolean(input?.checked);

  const { classes } = useChainItemStyles({ disabled, isChecked });

  return (
    <FormControlLabel
      className={className}
      label={
        <Typography variant="body2" className={classes.label}>
          {label}
        </Typography>
      }
      control={
        <Checkbox
          disabled={!isChecked && disabled}
          color="primary"
          className={classes.checkbox}
          {...input}
        />
      }
    />
  );
};

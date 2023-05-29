import React, { ReactNode } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FormControlLabel, Typography, Checkbox } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';

import { getErrorText } from '../../utils/getErrorText';
import { hasError } from '../../utils/hasError';

interface ISwitchFieldProps extends FieldRenderProps<HTMLElement> {
  label: string;
  children?: ReactNode;
  shouldHideError?: boolean;
}

export const CheckboxField = ({
  label,
  input,
  meta,
  shouldHideError,
  className = '',
}: ISwitchFieldProps & any) => {
  return (
    <>
      <FormControlLabel
        className={className}
        label={
          typeof label === 'string' ? (
            <Typography variant="caption" color="textSecondary">
              {label}
            </Typography>
          ) : (
            label
          )
        }
        control={
          <Checkbox
            color="primary"
            sx={{ marginRight: 2, width: 18, height: 18 }}
            {...input}
          />
        }
      />
      {!shouldHideError && hasError(meta) && (
        <FormHelperText error>{getErrorText(meta)}</FormHelperText>
      )}
    </>
  );
};

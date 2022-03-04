import React, { ReactNode } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FormControlLabel, Typography, Checkbox } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';

import { getErrorText } from '../../utils/getErrorText';
import { hasError } from '../../utils/hasError';

interface ISwitchFieldProps extends FieldRenderProps<HTMLElement> {
  label: string;
  children?: ReactNode;
}

export const CheckboxField = ({
  label,
  input,
  meta,
}: ISwitchFieldProps & any) => {
  return (
    <>
      <FormControlLabel
        style={{
          alignItems: 'flex-start',
        }}
        label={
          typeof label === 'string' ? (
            <Typography variant="caption" color="textSecondary">
              {label}
            </Typography>
          ) : (
            label
          )
        }
        control={<Checkbox color="primary" {...input} />}
      />
      {hasError(meta) && (
        <FormHelperText error>{getErrorText(meta)}</FormHelperText>
      )}
    </>
  );
};

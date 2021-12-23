import { Checkbox, FormControlLabel } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import { getErrorText, hasError } from 'modules/common/utils/form';
import React, { ReactNode } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { Body2 } from '../Typography';
import { useCheckboxStyles } from './useCheckboxStyles';

interface ISwitchFieldProps extends FieldRenderProps<HTMLElement> {
  children?: ReactNode;
  label: string;
}

export const CheckboxField = ({
  children,
  input,
  label,
  meta,
}: ISwitchFieldProps & any) => {
  const classes = useCheckboxStyles();

  return (
    <div>
      <FormControlLabel
        classes={{ root: classes.labelRoot }}
        control={<Checkbox color="primary" {...input} />}
        label={children || <Body2>{label}</Body2>}
      />

      {hasError(meta) && (
        <FormHelperText error={true}>{getErrorText(meta)}</FormHelperText>
      )}
    </div>
  );
};

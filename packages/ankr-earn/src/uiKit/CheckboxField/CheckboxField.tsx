import { Checkbox, FormControl, FormControlLabel } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import { getErrorText, hasError } from 'modules/common/utils/form';
import React, { ReactNode } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { Body2 } from '../Typography';
import { useCheckboxStyles } from './useCheckboxStyles';

interface ISwitchFieldProps extends FieldRenderProps<HTMLElement> {
  label: string;
  children?: ReactNode;
}

export const CheckboxField = ({
  label,
  input,
  meta,
  children,
}: ISwitchFieldProps & any) => {
  const classes = useCheckboxStyles();

  return (
    <div>
      <FormControlLabel
        label={children || <Body2>{label}</Body2>}
        classes={{ root: classes.root }}
        control={
          <FormControl error={!!meta.error} className={classes.checkbox}>
            <Checkbox color="primary" {...input} />
          </FormControl>
        }
      />
      {hasError(meta) && (
        <FormHelperText error={true}>{getErrorText(meta)}</FormHelperText>
      )}
    </div>
  );
};

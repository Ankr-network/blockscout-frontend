import { Field } from 'react-final-form';
import { FormGroup, Typography } from '@material-ui/core';
import { ISelectOption } from 'uiKit/Select';

import { SelectField } from 'modules/form/components/SelectField';
import { useEVMMethodsFormStyles } from '../../MethodsFormStyles';

export interface DropdownFieldProps {
  helperText: string;
  name: string;
  options: ISelectOption[];
  placeholder?: string;
}

export const DropdownField = ({
  helperText,
  name = '',
  options,
  placeholder,
}: DropdownFieldProps) => {
  const classes = useEVMMethodsFormStyles();

  return (
    <FormGroup className={classes.blockNumber}>
      <Field
        component={SelectField}
        helperText={
          <Typography
            variant="subtitle1"
            className={classes.label}
            component="span"
          >
            {helperText}
          </Typography>
        }
        initialValue={options?.[0]?.value}
        name={name}
        options={options}
        placeholder={placeholder}
        rootClassName={classes.selectField}
        variant="outlined"
      />
    </FormGroup>
  );
};

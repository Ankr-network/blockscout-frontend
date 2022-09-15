import { FormGroup, Typography } from '@material-ui/core';
import { Field } from 'react-final-form';

import { InputField } from 'modules/form/components/InputField';
import { useEVMMethodsFormStyles } from '../../MethodsFormStyles';

interface HashFieldProps {
  helperText: string;
  placeholder?: string;
  name: string;
}

const InputProps = {
  multiline: true,
};

export const HashField = ({
  helperText,
  placeholder,
  name,
}: HashFieldProps) => {
  const classes = useEVMMethodsFormStyles();

  return (
    <FormGroup className={classes.blockNumber}>
      <Field
        component={InputField}
        name={name}
        variant="outlined"
        placeholder={placeholder}
        InputProps={InputProps}
        helperText={
          <Typography
            variant="subtitle1"
            className={classes.label}
            component="span"
          >
            {helperText}
          </Typography>
        }
      />
    </FormGroup>
  );
};

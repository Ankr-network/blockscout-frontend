import { Field } from 'react-final-form';
import { FormGroup, Typography } from '@material-ui/core';

import { useABIMethodFieldStyles } from './ABIMethodFieldsStyles';
import { useSubfields } from './hooks/useSubfields';

export interface ABIMethodFieldProps {
  name: string;
}

export const ABIMethodField = ({ name }: ABIMethodFieldProps) => {
  const classes = useABIMethodFieldStyles();

  const subfields = useSubfields({
    name,
    methodFieldClassName: classes.methodField,
  });

  return (
    <FormGroup className={classes.abiMethodField}>
      {subfields.map(({ helperText, ...field }) => (
        <Field
          {...field}
          helperText={
            <Typography
              className={classes.label}
              component="span"
              variant="subtitle1"
            >
              {helperText}
            </Typography>
          }
          variant="outlined"
          key={field.name}
        />
      ))}
    </FormGroup>
  );
};

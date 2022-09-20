import { Field } from 'react-final-form';
import { FormGroup, Typography } from '@material-ui/core';

import { Subfield } from './types';
import { useABIMethodFieldStyles } from './ABIMethodFieldsStyles';
import { useSubfields } from './hooks/useSubfields';

export interface ABIMethodFieldProps {
  name: string;
  subfields: Subfield[];
}

export const ABIMethodField = ({
  name,
  subfields: fields,
}: ABIMethodFieldProps) => {
  const classes = useABIMethodFieldStyles();

  const subfields = useSubfields({
    methodFieldClassName: classes.methodField,
    name,
    subfields: fields,
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

import { Typography } from '@material-ui/core';
import { ReactNode } from 'react';
import { Field } from 'react-final-form';

import { AmountField } from 'uiKit/AmountField';

import { useFixedInputFieldStyles } from './useFixedInputFieldStyles';

interface IFixedInputFieldProps {
  name?: string;
  label: ReactNode;
  additionalInfoSlot?: ReactNode;
}

export const FixedInputField = ({
  label,
  name = 'amount',
  additionalInfoSlot,
}: IFixedInputFieldProps): JSX.Element => {
  const classes = useFixedInputFieldStyles();

  return (
    <>
      {additionalInfoSlot && (
        <Typography
          className={classes.additionalInfo}
          color="textSecondary"
          component="div"
          variant="body2"
        >
          {additionalInfoSlot}
        </Typography>
      )}

      <Field
        disabled
        fullWidth
        component={AmountField}
        label={label}
        name={name}
        variant="outlined"
      />
    </>
  );
};

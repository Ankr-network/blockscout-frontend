import { Paper } from '@mui/material';

import {
  IReferralCodeCheckboxProps,
  ReferralCodeCheckbox,
} from '../ReferralCodeCheckbox';
import {
  IReferralCodeInputProps,
  ReferralCodeInput,
} from '../ReferralCodeInput';
import { useReferralCodeBoxStyles } from './useReferralCodeBoxStyles';

export interface IReferralCodeBoxProps {
  checkboxProps: IReferralCodeCheckboxProps;
  inputProps: IReferralCodeInputProps;
}

export const ReferralCodeBox = ({
  checkboxProps,
  inputProps,
}: IReferralCodeBoxProps) => {
  const { isChecked: hasInput } = checkboxProps;

  const { classes } = useReferralCodeBoxStyles();

  return (
    <Paper classes={classes} variant="outlined">
      <ReferralCodeCheckbox {...checkboxProps} />
      {hasInput && <ReferralCodeInput {...inputProps} />}
    </Paper>
  );
};

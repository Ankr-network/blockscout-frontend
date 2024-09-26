import { Checkbox, FormControlLabel } from '@mui/material';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { referralCodeCheckboxTranslation } from './translation';
import { useReferralCodeCheckboxStyles } from './useReferralCodeCheckboxStyles';

export interface IReferralCodeCheckboxProps {
  isChecked: boolean;
  isDisabled?: boolean;
  onChange: () => void;
}

export const ReferralCodeCheckbox = ({
  isChecked,
  isDisabled,
  onChange,
}: IReferralCodeCheckboxProps) => {
  const { keys, t } = useTranslation(referralCodeCheckboxTranslation);

  const { classes } = useReferralCodeCheckboxStyles();

  return (
    <FormControlLabel
      classes={classes}
      control={
        <Checkbox
          checked={isChecked}
          onChange={onChange}
          disabled={isDisabled}
        />
      }
      label={t(keys.label)}
      slotProps={{ typography: { variant: 'body2' } }}
    />
  );
};

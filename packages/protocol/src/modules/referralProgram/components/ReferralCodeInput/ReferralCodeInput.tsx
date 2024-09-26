import { ChangeEventHandler } from 'react';
import { CircleCheck, TextField } from '@ankr.com/ui';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { referralCodeInputTranslation } from './translation';
import { useReferralCodeInputStyles } from './useReferralCodeInputStyles';

export interface IReferralCodeInputProps {
  error?: string;
  isReferralCodeApplied?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
}

export const ReferralCodeInput = ({
  error,
  isReferralCodeApplied,
  onChange,
  value,
}: IReferralCodeInputProps) => {
  const { classes } = useReferralCodeInputStyles();
  const { keys, t } = useTranslation(referralCodeInputTranslation);

  const [endAdornment, helperText] = isReferralCodeApplied
    ? [<CircleCheck color="success" key="" />, t(keys.appliedCodeMessage)]
    : [undefined, error];

  return (
    <TextField
      InputProps={{ className: classes.inputRoot, endAdornment }}
      autoFocus
      classes={classes}
      error={Boolean(error)}
      helperText={helperText}
      onChange={onChange}
      placeholder={t(keys.placeholder)}
      value={value}
    />
  );
};

import { ChangeEventHandler } from 'react';
import { CircleCheck, TextField } from '@ankr.com/ui';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { referralCodeInputTranslation } from './translation';
import { useReferralCodeInputStyles } from './useReferralCodeInputStyles';

export interface IReferralCodeInputProps {
  isReferralCodeApplied?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
}

export const ReferralCodeInput = ({
  isReferralCodeApplied,
  onChange,
  value,
}: IReferralCodeInputProps) => {
  const { classes } = useReferralCodeInputStyles();
  const { keys, t } = useTranslation(referralCodeInputTranslation);

  const [endAdornment, helperText] = isReferralCodeApplied
    ? [<CircleCheck color="success" key="" />, t(keys.appliedCodeMessage)]
    : [undefined, undefined];

  return (
    <TextField
      InputProps={{ className: classes.inputRoot, endAdornment }}
      autoFocus
      classes={classes}
      helperText={helperText}
      onChange={onChange}
      placeholder={t(keys.placeholder)}
      value={value}
    />
  );
};

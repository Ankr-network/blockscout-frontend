import { Typography } from '@material-ui/core';
import { t, tHTML } from 'common';
import { ReactNode } from 'react';
import { useStyles } from './SuccessStepStyles';

interface ISuccessStepProps {
  email?: string;
  formSlot?: ReactNode;
}

export const SuccessStep = ({
  email = t('user-settings.common.email-value-fallback'),
  formSlot,
}: ISuccessStepProps) => {
  const classes = useStyles();

  return (
    <>
      <Typography className={classes.description}>
        {tHTML('user-settings.email-banner.success-step.verify-email-text', {
          email,
        })}
      </Typography>

      {formSlot}
    </>
  );
};

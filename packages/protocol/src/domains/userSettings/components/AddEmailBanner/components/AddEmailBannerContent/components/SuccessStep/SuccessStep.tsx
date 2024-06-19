import { Typography } from '@mui/material';
import { ReactNode } from 'react';
import { t, tHTML } from '@ankr.com/common';

import { useStyles } from './SuccessStepStyles';

interface ISuccessStepProps {
  email?: string;
  children: ReactNode;
}

export const SuccessStep = ({ children, email }: ISuccessStepProps) => {
  const { classes } = useStyles();

  return (
    <>
      <Typography className={classes.description}>
        {tHTML(
          'user-settings.change-email-dialog.success-step.verify-email-text',
          {
            email: email || t('user-settings.common.email-value-fallback'),
          },
        )}
      </Typography>

      {children}
    </>
  );
};

import React from 'react';
import { Button, Typography, Box } from '@material-ui/core';
import classNames from 'classnames';

import { t } from 'modules/i18n/utils/intl';
import { useStyles } from './TopUpStyles';
import { TopUpForm } from './TopUpForm';

const PRICING_LINK = '#';

export interface TopUpProps {
  className?: string;
}

export const TopUp = ({ className }: TopUpProps) => {
  const classes = useStyles();

  return (
    <Box className={classNames(classes.root, className)}>
      <Box className={classes.top}>
        <Typography variant="subtitle1" className={classes.title}>
          {t('account.account-details.top-up.title')}
        </Typography>
        <Button
          className={classes.link}
          href={PRICING_LINK}
          color="primary"
          target="_blank"
          variant="text"
        >
          {t('account.account-details.top-up.pricing-link')}
        </Button>
      </Box>
      <TopUpForm />
    </Box>
  );
};

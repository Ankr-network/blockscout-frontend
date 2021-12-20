import React from 'react';
import { Typography, Button } from '@material-ui/core';

import { t } from 'modules/i18n/utils/intl';
import { useStyles } from './useStyles';

interface ConnectWalletBlockProps {
  onClick: () => void;
  isLoading: boolean;
}

export const ConnectWalletBlock = ({
  onClick,
  isLoading,
}: ConnectWalletBlockProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button
        variant="text"
        color="primary"
        className={classes.button}
        onClick={onClick}
        disabled={isLoading}
      >
        <Typography variant="h4" className={classes.title} color="textPrimary">
          {t('plan.connect-wallet.title')}
        </Typography>
        <Typography variant="h4" className={classes.title}>
          {t('plan.connect-wallet.subtitle')}
        </Typography>
      </Button>
    </div>
  );
};

import { t } from '@ankr.com/common';
import { Button, Paper, Typography } from '@material-ui/core';
import { cloneElement } from 'react';

import { useUnsupportedWalletStyles } from './useUnsupportedWalletStyles';

interface IUnsupportedWalletProps {
  title: string;
  iconSlot: JSX.Element;
  onClick: () => void;
}

export const UnsupportedWallet = ({
  title,
  iconSlot,
  onClick,
}: IUnsupportedWalletProps): JSX.Element => {
  const classes = useUnsupportedWalletStyles();

  return (
    <Paper className={classes.paper}>
      {cloneElement(iconSlot, { className: classes.icon })}

      <Typography className={classes.title} variant="h3">
        {title}
      </Typography>

      <Typography variant="body2">
        {t('unsupported-wallet.description')}
      </Typography>

      <Button
        fullWidth
        className={classes.button}
        size="large"
        variant="contained"
        onClick={onClick}
      >
        {t('unsupported-wallet.button')}
      </Button>
    </Paper>
  );
};

import React from 'react';
import { Dialog, Button, Typography } from '@material-ui/core';

import { t } from 'modules/i18n/utils/intl';
import { useStyles } from './ChainDialogStyles';
import { ChainDialogProps } from './ChainDialogTypes';

export const ChainDialog = ({
  isOpened,
  onClose,
  onButtonClick,
  icon,
  name,
}: ChainDialogProps) => {
  const classes = useStyles();

  return (
    <Dialog
      open={isOpened}
      onEscapeKeyDown={onClose}
      onBackdropClick={onClose}
      disableAutoFocus={false}
      classes={{
        paper: classes.paper,
      }}
    >
      <div className={classes.root}>
        <div className={classes.chainInfo}>
          <img className={classes.logo} src={icon} alt={name} />
          <Typography variant="h4" noWrap className={classes.title}>
            {name}
          </Typography>
        </div>
        <div className={classes.buttons}>
          <Button
            className={classes.button}
            variant="contained"
            onClick={onButtonClick}
          >
            {t('providers.chains.button')}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

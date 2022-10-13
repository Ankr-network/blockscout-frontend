import { Paper, Typography } from '@material-ui/core';
import React from 'react';

import { AvailableWriteProviders } from '@ankr.com/provider';
import { t, tHTML } from 'common';

import { useAuth } from 'modules/auth/common/hooks/useAuth';
import { EKnownDialogs, useDialog } from 'modules/dialogs';
import { Button } from 'uiKit/Button';
import { MGNOIcon } from 'uiKit/Icons/MGNOIcon';

import { useUnsupportedBannerStyles } from './useUnsupportedBannerStyles';

const INSTALL_METAMASK_URL = 'https://metamask.io/download/';

export const UnsupportedBanner = (): JSX.Element => {
  const classes = useUnsupportedBannerStyles();
  const { dispatchDisconnect } = useAuth(AvailableWriteProviders.ethCompatible);
  const { handleOpen } = useDialog(EKnownDialogs.connect);

  const handleBtnClick = async () => {
    await dispatchDisconnect();
    handleOpen();
  };

  return (
    <Paper className={classes.paper}>
      {React.cloneElement(<MGNOIcon />, {
        className: classes.icon,
      })}

      <Typography className={classes.title} variant="h3">
        {t('stake-mgno.usnupported.title')}
      </Typography>

      <Typography className={classes.desc}>
        {tHTML('stake-mgno.usnupported.description', {
          link: INSTALL_METAMASK_URL,
        })}
      </Typography>

      <Button
        className={classes.button}
        variant="contained"
        onClick={handleBtnClick}
      >
        {t('stake-mgno.usnupported.btn')}
      </Button>
    </Paper>
  );
};

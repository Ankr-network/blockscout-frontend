import { t, tHTML } from '@ankr.com/common';
import { Paper, Typography } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';
import React from 'react';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { disconnect } from 'modules/auth/common/actions/disconnect';
import { EKnownDialogs, useDialog } from 'modules/dialogs';
import { Button } from 'uiKit/Button';
import { MGNOIcon } from 'uiKit/Icons/MGNOIcon';

import { useUnsupportedBannerStyles } from './useUnsupportedBannerStyles';

const INSTALL_METAMASK_URL = 'https://metamask.io/download/';

export const UnsupportedBanner = (): JSX.Element => {
  const classes = useUnsupportedBannerStyles();
  const dispatchRequest = useDispatchRequest();

  const { handleOpen } = useDialog(EKnownDialogs.connect);

  const handleBtnClick = async () => {
    await dispatchRequest(disconnect(AvailableWriteProviders.ethCompatible));
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

import { AvailableWriteProviders } from '@ankr.com/provider-core';
import { Paper, Typography } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';

import { t, tHTML } from 'common';

import { disconnect } from 'modules/auth/common/actions/disconnect';
import { EKnownDialogs, useDialog } from 'modules/dialogs';
import { Button } from 'uiKit/Button';
import { SSVStakingIcon } from 'uiKit/Icons/SSVStakingIcon';

import { useUnsupportedBannerStyles } from './useUnsupportedBannerStyles';

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
      <SSVStakingIcon className={classes.icon} />

      <Typography className={classes.title} variant="h3">
        {t('stake-ssv.unsupported.title')}
      </Typography>

      <Typography className={classes.desc}>
        {tHTML('stake-ssv.unsupported.description')}
      </Typography>

      <Button
        className={classes.button}
        variant="contained"
        onClick={handleBtnClick}
      >
        {t('connect.connect')}
      </Button>
    </Paper>
  );
};

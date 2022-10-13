import { Paper, Typography } from '@material-ui/core';

import { AvailableWriteProviders, t, tHTML } from 'common';

import { useAuth } from 'modules/auth/common/hooks/useAuth';
import { EKnownDialogs, useDialog } from 'modules/dialogs';
import ankrBigLogo from 'modules/stake-ankr/assets/ankr-logo-big.jpg';
import { Button } from 'uiKit/Button';

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
      <img alt="" className={classes.bigLogo} src={ankrBigLogo} />

      <Typography className={classes.title} variant="h3">
        {t('stake-ankr.usnupported.title')}
      </Typography>

      <Typography className={classes.desc}>
        {tHTML('stake-ankr.usnupported.description', {
          link: INSTALL_METAMASK_URL,
        })}
      </Typography>

      <Button
        className={classes.button}
        variant="contained"
        onClick={handleBtnClick}
      >
        {t('stake-ankr.usnupported.btn')}
      </Button>
    </Paper>
  );
};

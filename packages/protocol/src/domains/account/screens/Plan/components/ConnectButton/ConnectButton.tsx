import { Typography, Button } from '@material-ui/core';
import { t } from 'modules/i18n/utils/intl';

import { useStyles } from './ConnectButtonStyles';
import { useAuth } from 'modules/auth/hooks/useAuth';

export const ConnectButton = () => {
  const classes = useStyles();

  const { handleConnect } = useAuth();

  return (
    <Button
      size="large"
      className={classes.unlockBtn}
      variant="contained"
      onClick={handleConnect}
    >
      <Typography variant="h5" className={classes.unlockBtnTitle}>
        {t('plan.unlock-btn')}
      </Typography>
    </Button>
  );
};

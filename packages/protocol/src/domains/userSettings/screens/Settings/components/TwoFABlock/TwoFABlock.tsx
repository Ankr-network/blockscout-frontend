import { Button, Paper, Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { Dot, TriangleWarning } from '@ankr.com/ui';

import { useTwoFABlockStyles } from './useTwoFABlockStyles';
import { SoonLabel } from 'modules/common/components/SoonLabel';
import { useAuth } from 'domains/auth/hooks/useAuth';

const intl = 'user-settings.2fa';

const IS_AVAIABLE = false;

export const TwoFABlock = () => {
  const { classes } = useTwoFABlockStyles();

  const { hasOauthLogin } = useAuth();

  if (!hasOauthLogin) {
    return null;
  }

  return (
    <Paper className={classes.root}>
      <div className={classes.row}>
        <Typography className={classes.title}>{t(`${intl}.title`)}</Typography>
        {IS_AVAIABLE && (
          <div className={classes.status}>
            <Dot className={classes.off} />
            {t(`${intl}.off`)}
          </div>
        )}
        <SoonLabel />
      </div>
      {IS_AVAIABLE && (
        <div className={classes.info}>
          <div className={classes.row}>
            <div className={classes.circle}>
              <TriangleWarning />
            </div>
            {t(`${intl}.info`)}
          </div>
          <Button size="large" color="warning" className={classes.button}>
            <Typography noWrap className={classes.text}>
              {t(`${intl}.button`)}
            </Typography>
          </Button>
        </div>
      )}
    </Paper>
  );
};

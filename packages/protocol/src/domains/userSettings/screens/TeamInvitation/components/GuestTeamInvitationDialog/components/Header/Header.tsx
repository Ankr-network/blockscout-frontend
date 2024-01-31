import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { RPCLogo, RPCLogoClasses } from 'modules/common/components/RPCLogo';

import { useHeaderStyles } from './useHeaderStyles';

export const Header = () => {
  const { classes } = useHeaderStyles();

  const rpcLogoClasses = useMemo<RPCLogoClasses>(
    () => ({
      root: classes.logoRoot,
      icon: classes.logoIcon,
      text: classes.logoText,
    }),
    [classes],
  );

  return (
    <div className={classes.root}>
      <RPCLogo classes={rpcLogoClasses} />
      <Typography className={classes.label} variant="body2">
        {t('teams.guest-team-invitation-dialog.rpc-logo-label')}
      </Typography>
    </div>
  );
};

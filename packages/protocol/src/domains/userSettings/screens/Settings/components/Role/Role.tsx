import { Button, Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { Lock } from '@ankr.com/ui';
import { GroupUserRole } from 'multirpc-sdk';

import { GroupUserRoleMap } from 'domains/userGroup/constants/groups';
import { useContactWidget } from 'hooks/useContactWidget';

import { useRoleStyles } from './useRoleStyles';

export interface IRoleProps {
  team: string;
  role: GroupUserRole;
}

export const Role = ({ team, role }: IRoleProps) => {
  const { classes } = useRoleStyles();

  const { openContactWidget } = useContactWidget();

  return (
    <div className={classes.root}>
      <div className={classes.info}>
        <Typography variant="subtitle1" className={classes.team} noWrap>
          {team}
        </Typography>
        <div className={classes.role}>
          <Typography className={classes.roleText} noWrap>
            {GroupUserRoleMap[role]}
          </Typography>
          <Lock className={classes.icon} />
        </div>
      </div>
      <Button
        variant="outlined"
        color="error"
        className={classes.removeButton}
        onClick={openContactWidget}
      >
        {t('user-settings.remove-from-team')}
      </Button>
    </div>
  );
};

import { useCallback } from 'react';
import { Button, Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { Lock } from '@ankr.com/ui';

import { useRoleStyles } from './useRoleStyles';
import { GroupUserRole } from 'multirpc-sdk';
import {
  JSD_HELP_BUTTON_ID,
  JSD_WIDGET_ID,
} from 'modules/common/components/JiraServiceDeskMounter/useJSDWidget';
import { GroupUserRoleMap } from 'domains/userGroup/constants/groups';

export interface IRoleProps {
  team: string;
  role: GroupUserRole;
}

export const Role = ({ team, role }: IRoleProps) => {
  const { classes } = useRoleStyles();

  const handleClick = useCallback(() => {
    const iframe: HTMLIFrameElement = document.getElementById(
      JSD_WIDGET_ID,
    ) as HTMLIFrameElement;

    const button: HTMLButtonElement = iframe?.contentDocument?.getElementById(
      JSD_HELP_BUTTON_ID,
    ) as HTMLButtonElement;

    if (button) {
      button.click();
    }
  }, []);

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
        onClick={handleClick}
      >
        {t('user-settings.remove-from-team')}
      </Button>
    </div>
  );
};

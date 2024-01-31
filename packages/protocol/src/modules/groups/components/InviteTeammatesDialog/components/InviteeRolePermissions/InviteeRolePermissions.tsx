import { Box, Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { userRoleNamesMap } from 'domains/userSettings/screens/Settings/constants';

import { INTL_ROOT } from './constants';
import { InviteeRole } from '../../types';
import { renderInviteeRolePermissions } from './utils/renderInviteeRolePermissions';
import { useInviteeRolePermissionsStyles } from './useInviteeRolePermissionsStyles';

export interface InviteeRolePermissionsProps {
  className?: string;
  role: InviteeRole;
}

export const InviteeRolePermissions = ({
  className,
  role,
}: InviteeRolePermissionsProps) => {
  const { classes, cx } = useInviteeRolePermissionsStyles();

  const roleName = t(userRoleNamesMap[role]);

  return (
    <Box className={cx(classes.root, className)}>
      <Typography variant="subtitle2">
        {t(`${INTL_ROOT}.title`, { roleName })}
      </Typography>
      <Typography className={classes.permissions} variant="body3">
        {renderInviteeRolePermissions(role)}
      </Typography>
    </Box>
  );
};

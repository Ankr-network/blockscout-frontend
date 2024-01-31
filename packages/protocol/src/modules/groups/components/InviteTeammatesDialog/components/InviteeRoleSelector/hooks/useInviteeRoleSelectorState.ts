import { ReactNode, useCallback, useMemo } from 'react';
import { t } from '@ankr.com/common';

import { InviteeRole } from 'modules/groups/components/InviteTeammatesDialog/types';
import { userRoleNamesMap } from 'domains/userSettings/screens/Settings/constants';

import { inviteeRoles, inviteeRolesDescriptionMap } from '../constants';

export interface InviteeRoleOption {
  description: string;
  label: string;
  value: InviteeRole;
}

export const useInviteeRoleSelectorState = () => {
  const renderValue = useCallback(
    (value: InviteeRole): ReactNode => t(userRoleNamesMap[value]),
    [],
  );

  const options = useMemo(
    () =>
      inviteeRoles.map<InviteeRoleOption>(inviteeRole => ({
        description: t(inviteeRolesDescriptionMap[inviteeRole]),
        label: t(userRoleNamesMap[inviteeRole]),
        value: inviteeRole,
      })),
    [],
  );

  return { options, renderValue };
};

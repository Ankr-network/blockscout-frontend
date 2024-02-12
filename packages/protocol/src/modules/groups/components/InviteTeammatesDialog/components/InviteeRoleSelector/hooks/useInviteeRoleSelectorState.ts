import { ReactNode, useCallback, useMemo } from 'react';
import { t } from '@ankr.com/common';

import { InviteeRole } from 'modules/groups/components/InviteTeammatesDialog/types';
import { getUserRoleName } from 'modules/groups/utils/getUserRoleName';

import { inviteeRoles, inviteeRolesDescriptionMap } from '../constants';

export interface InviteeRoleOption {
  description: string;
  label: string;
  value: InviteeRole;
}

export const useInviteeRoleSelectorState = () => {
  const renderValue = useCallback(
    (role: InviteeRole): ReactNode => getUserRoleName(role),
    [],
  );

  const options = useMemo(
    () =>
      inviteeRoles.map<InviteeRoleOption>(inviteeRole => ({
        description: t(inviteeRolesDescriptionMap[inviteeRole]),
        label: t(getUserRoleName(inviteeRole)),
        value: inviteeRole,
      })),
    [],
  );

  return { options, renderValue };
};

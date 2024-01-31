import { GroupUserRole } from 'multirpc-sdk';
import { useCallback, useState } from 'react';

import { InviteeRole } from 'modules/groups/components/InviteTeammatesDialog/types';

import { InviteeRoleSelectorProps, OnChange } from '../types';

export const useInviteeRoleSelector = (): InviteeRoleSelectorProps => {
  const [inviteeRole, setInviteeRole] = useState<InviteeRole>(
    GroupUserRole.dev,
  );

  const onChange = useCallback<OnChange>(event => {
    const role = event.target.value as InviteeRole;

    setInviteeRole(role);
  }, []);

  return { value: inviteeRole, onChange };
};

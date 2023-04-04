import { useCallback, useState } from 'react';
import { UserGroupRole } from 'multirpc-sdk';
import { SelectChangeEvent } from '@mui/material';

type IRole = {
  value: UserGroupRole;
  label: string;
};

export const roles: IRole[] = [
  {
    value: 'GROUP_ROLE_DEV',
    label: 'developer',
  },
  {
    value: 'GROUP_ROLE_FINANCE',
    label: 'finance manager',
  },
  {
    value: 'GROUP_ROLE_OWNER',
    label: 'owner',
  },
];

export const useUserRole = () => {
  const [role, setRole] = useState<UserGroupRole>(roles[0].value);
  const handleSelectRole = useCallback(
    (e: SelectChangeEvent<UserGroupRole>) => {
      setRole(e.target.value as UserGroupRole);
    },
    [],
  );

  return {
    role,
    handleSelectRole,
  };
};

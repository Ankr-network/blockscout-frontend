import { UserGroupRole, Web3Address } from 'multirpc-sdk';
import { useSetUserGroupMutation } from '../../actions/setUserGroup';
import { FormEvent, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { SelectChangeEvent } from '@mui/material';

export enum FormElementItems {
  groupAddress = 'groupAddress',
  userAddress = 'userAddress',
  role = 'role',
}

export interface FormElements {
  elements: {
    [FormElementItems.groupAddress]: { value: Web3Address };
    [FormElementItems.userAddress]: { value: Web3Address };
    [FormElementItems.role]: { value: UserGroupRole };
  };
}

type IRole = {
  value: UserGroupRole;
  label: string;
};

export const roles: IRole[] = [
  {
    value: 'DEV',
    label: 'DEV',
  },
  {
    value: 'OWNER',
    label: 'OWNER',
  },
  {
    value: 'FINANCE',
    label: 'FINANCE',
  },
];

export const useSetUserGroup = () => {
  const [setUserGroup, { isLoading }] = useSetUserGroupMutation();

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [role, setRole] = useState<UserGroupRole>(roles[0].value);
  const handleSelectRole = (e: SelectChangeEvent<UserGroupRole>) => {
    setRole(e.target.value as UserGroupRole);
  };

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement> & { target: FormElements }) => {
      e.preventDefault();
      const {
        groupAddress: { value: groupAddressValue },
        userAddress: { value: userAddressValue },
      } = e.target.elements;
      if (groupAddressValue && userAddressValue && role) {
        setUserGroup({
          groupAddress: groupAddressValue.toLowerCase(),
          userAddress: userAddressValue.toLowerCase(),
          role: role.toLowerCase() as Lowercase<UserGroupRole>,
        }).then(res => {
          if (res && 'error' in res) {
            toast.error('check address and try again');
          } else {
            setOpen(false);
          }
        });
      } else {
        toast.error('all params are required');
      }
    },
    [role, setUserGroup],
  );

  return {
    handleSubmit,
    role,
    handleSelectRole,
    isLoading,
    handleOpen,
    open,
    handleClose,
  };
};

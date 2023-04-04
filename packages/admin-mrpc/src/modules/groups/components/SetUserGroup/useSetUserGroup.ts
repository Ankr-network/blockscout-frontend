import { FormEvent, useCallback } from 'react';
import { toast } from 'react-toastify';
import { UserGroupRole, Web3Address } from 'multirpc-sdk';
import { useModal } from 'modules/common/hooks/useModal';
import { useSetUserGroupMutation } from '../../actions/setUserGroup';
import { useUserRole } from '../UserRoleSelect/useUserRole';

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

export const useSetUserGroup = () => {
  const [setUserGroup, { isLoading }] = useSetUserGroupMutation();

  const { role, handleSelectRole } = useUserRole();

  const { open, handleOpen, handleClose } = useModal();

  const handleSubmit = useCallback(
    (
      e: FormEvent<HTMLFormElement> & {
        target: HTMLFormElement & FormElements;
      },
    ) => {
      e.preventDefault();
      const {
        [FormElementItems.groupAddress]: { value: groupAddressValue },
        [FormElementItems.userAddress]: { value: userAddressValue },
      } = e.target.elements;
      if (groupAddressValue && userAddressValue && role) {
        setUserGroup({
          groupAddress: groupAddressValue.toLowerCase(),
          userAddress: userAddressValue.toLowerCase(),
          role,
        }).then(res => {
          if (res && 'error' in res) {
            toast.error('check address and try again');
          } else {
            e.target.reset();
            handleClose();
          }
        });
      } else {
        toast.error('all params are required');
      }
    },
    [handleClose, role, setUserGroup],
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

import { FormEvent, useCallback } from 'react';
import { toast } from 'react-toastify';
import { Web3Address } from 'multirpc-sdk';
import { useCreateUserGroupMutation } from '../../actions/createUserGroup';
import { useLazyGetUserGroupsQuery } from '../../actions/getUserGroups';

export enum FormCreateUserGroupElementItems {
  groupName = 'groupName',
  userAddress = 'userAddress',
}

export interface FormCreateUserGroupElements {
  elements: {
    [FormCreateUserGroupElementItems.groupName]: { value: Web3Address };
    [FormCreateUserGroupElementItems.userAddress]: { value: Web3Address };
  };
}

export const useCreateUserGroup = () => {
  const [createGroup, { isLoading }] = useCreateUserGroupMutation();
  const [fetchGroups] = useLazyGetUserGroupsQuery();

  const handleSubmit = useCallback(
    (
      e: FormEvent<HTMLFormElement> & {
        target: HTMLFormElement & FormCreateUserGroupElements;
      },
    ) => {
      e.preventDefault();
      const {
        [FormCreateUserGroupElementItems.groupName]: { value: groupNameValue },
        [FormCreateUserGroupElementItems.userAddress]: {
          value: userAddressValue,
        },
      } = e.target.elements;

      if (userAddressValue && groupNameValue) {
        createGroup({
          groupName: groupNameValue,
          ownerAddress: userAddressValue,
        }).then(res => {
          if (res && 'error' in res) {
            toast.error('check address and try again');
          } else {
            e.target.reset();
            fetchGroups({});
          }
        });
      } else {
        toast.error('all params are required');
      }
    },
    [createGroup, fetchGroups],
  );

  return {
    handleSubmit,
    isLoading,
  };
};

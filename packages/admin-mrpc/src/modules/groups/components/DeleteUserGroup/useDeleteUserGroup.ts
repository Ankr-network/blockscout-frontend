import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { Web3Address } from 'multirpc-sdk';
import { useDeleteUserGroupMutation } from 'modules/groups/actions/deleteUserGroup';
import { useLazyGetUserGroupsQuery } from 'modules/groups/actions/getUserGroups';

export enum FormDeleteUserGroupElementItems {
  groupAddress = 'groupAddress',
}

export interface FormDeleteUserGroupElements {
  elements: {
    [FormDeleteUserGroupElementItems.groupAddress]: { value: Web3Address };
  };
}

export const useDeleteUserGroup = () => {
  const [deleteGroup, { isLoading }] = useDeleteUserGroupMutation();
  const [fetchGroups] = useLazyGetUserGroupsQuery();

  const [isDeleteMembersChecked, setIsDeleteMembersChecked] = useState(false);

  const handleSubmit = useCallback(
    (
      e: FormEvent<HTMLFormElement> & {
        target: HTMLFormElement & FormDeleteUserGroupElements;
      },
    ) => {
      e.preventDefault();
      const {
        [FormDeleteUserGroupElementItems.groupAddress]: {
          value: groupAddressValue,
        },
      } = e.target.elements;

      if (groupAddressValue) {
        deleteGroup({
          address: groupAddressValue,
          removeMembers: isDeleteMembersChecked,
        }).then(res => {
          if (res && 'error' in res) {
            toast.error(`group hasn't been deleted`);
          } else {
            fetchGroups({});
            e.target.reset();
            setIsDeleteMembersChecked(false);
          }
        });
      } else {
        toast.error('all params are required');
      }
    },
    [deleteGroup, fetchGroups, isDeleteMembersChecked],
  );

  const handleSwitch = (e: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setIsDeleteMembersChecked(checked);
  };

  return {
    handleSubmit,
    isLoading,
    isDeleteMembersChecked,
    onSwitch: handleSwitch,
  };
};

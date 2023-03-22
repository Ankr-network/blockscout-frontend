import { FormEvent, useCallback } from 'react';
import { toast } from 'react-toastify';
import {
  FormElementItems,
  FormElements,
} from '../SetUserGroup/useSetUserGroup';
import { useDeleteFromUserGroupMutation } from '../../actions/deleteFromGroup';

export const useDeleteUserFromGroup = () => {
  const [deleteFromGroup, { isLoading }] = useDeleteFromUserGroupMutation();

  const handleSubmit = useCallback(
    (
      e: FormEvent<HTMLFormElement> & {
        target: HTMLFormElement &
          Omit<FormElements, 'userAddress' | 'groupAddress'>;
      },
    ) => {
      e.preventDefault();
      const {
        [FormElementItems.groupAddress]: { value: groupAddressValue },
        [FormElementItems.userAddress]: { value: userAddressValue },
      } = e.target.elements;

      if (userAddressValue) {
        deleteFromGroup({
          group_address: groupAddressValue,
          user_address: userAddressValue,
        }).then(res => {
          if (res && 'error' in res) {
            toast.error('check address and try again');
          } else {
            e.target.reset();
          }
        });
      } else {
        toast.error('address param is required');
      }
    },
    [deleteFromGroup],
  );

  return {
    handleSubmit,
    isLoading,
  };
};

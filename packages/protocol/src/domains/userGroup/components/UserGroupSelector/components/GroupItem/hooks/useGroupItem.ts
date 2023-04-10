import { sleep } from '@ankr.com/common';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';

import { GroupItemProps } from '../types';
import { setUserGroupConfig } from 'domains/userGroup/store';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export const useGroupItem = ({ group, onSelect }: GroupItemProps) => {
  const { group: selectedGroup } = useSelectedUserGroup();
  const { address } = useAuth();

  const { groupAddress, userRole } = group;
  const isSelected = groupAddress === selectedGroup?.groupAddress;

  const dispatch = useDispatch();
  const onClick = useCallback(async () => {
    // wait till animation ends
    await sleep(200);

    onSelect();

    dispatch(
      setUserGroupConfig({
        address,
        selectedGroupAddress: groupAddress,
        selectedGroupRole: userRole,
      }),
    );

    // we should refetch all data on changing the user group
    // TODO: remove page reload here and refetch all group data on group change
    window.location.reload();
  }, [address, dispatch, groupAddress, onSelect, userRole]);

  return { isSelected, onClick };
};

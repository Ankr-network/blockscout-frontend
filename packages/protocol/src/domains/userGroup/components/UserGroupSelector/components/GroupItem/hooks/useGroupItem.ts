import { sleep } from '@ankr.com/common';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';

import { GroupItemProps } from '../types';
import {
  selectSelectedUserGroup,
  setUserGroupConfig,
} from 'domains/userGroup/store/userGroupSlice';
import { useAppSelector } from 'store/useAppSelector';
import { useAuth } from 'domains/auth/hooks/useAuth';

export const useGroupItem = ({ group, onSelect }: GroupItemProps) => {
  const selectedGroup = useAppSelector(selectSelectedUserGroup);
  const { address } = useAuth();

  const { groupAddress } = group;
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
      }),
    );
  }, [address, dispatch, groupAddress, onSelect]);

  return { isSelected, onClick };
};

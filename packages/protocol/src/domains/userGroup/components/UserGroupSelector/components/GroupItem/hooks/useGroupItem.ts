import { sleep } from '@ankr.com/common';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { fetchIsEnterpriseClient } from 'domains/enterprise/actions/fetchIsEnterpriseClient';

import { GroupItemProps } from '../types';

export const useGroupItem = ({
  group: { groupAddress, userRole },
  onSelect,
}: GroupItemProps) => {
  const { group: selectedGroup } = useSelectedUserGroup();

  const { address } = useAuth();

  const isSelected = groupAddress === selectedGroup?.groupAddress;

  const dispatch = useDispatch();

  const onClick = useCallback(async () => {
    // wait till animation ends
    await sleep(200);

    const isPersonalAccountSelected = groupAddress === address;

    const group = isPersonalAccountSelected ? undefined : groupAddress;

    const newUserGroupConfig = {
      address,
      selectedGroupAddress: groupAddress,
      selectedGroupRole: userRole,
    };

    const isClientFetchParams = {
      group,
      newUserGroupConfig,
    };

    await dispatch(fetchIsEnterpriseClient.initiate(isClientFetchParams));

    onSelect();
  }, [address, dispatch, groupAddress, onSelect, userRole]);

  return { isSelected, onClick };
};

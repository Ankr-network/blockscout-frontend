import { sleep } from '@ankr.com/common';
import { useCallback } from 'react';

import { fetchIsEnterpriseClient } from 'domains/enterprise/actions/fetchIsEnterpriseClient';
import { resetEndpoint } from 'store/utils/resetEndpoint';
import { useAppDispatch } from 'store/useAppDispatch';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import { GroupItemProps } from '../types';

export const useGroupItem = ({
  group: { groupAddress, userRole },
  onSelect,
}: GroupItemProps) => {
  const { group: selectedGroup } = useSelectedUserGroup();

  const { address } = useAuth();

  const isSelected = groupAddress === selectedGroup?.groupAddress;

  const dispatch = useAppDispatch();

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

    resetEndpoint('fetchPremiumStatus', dispatch);

    onSelect();
  }, [address, dispatch, groupAddress, onSelect, userRole]);

  return { isSelected, onClick };
};

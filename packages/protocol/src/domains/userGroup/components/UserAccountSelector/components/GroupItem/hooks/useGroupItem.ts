import { sleep } from '@ankr.com/common';
import { useCallback } from 'react';

import { fetchIsEnterpriseClient } from 'domains/enterprise/actions/fetchIsEnterpriseClient';
import { resetEndpoint } from 'store/utils/resetEndpoint';
import { useAppDispatch } from 'store/useAppDispatch';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useAvoidAccessDeniedAlert } from 'domains/userGroup/hooks/useAvoidAccessDeniedAlert';

import { GroupItemProps } from '../types';

export const useGroupItem = ({
  group: { address: groupAddress, role },
  onSelect,
}: GroupItemProps) => {
  const { group: selectedGroup } = useSelectedUserGroup();

  const avoidAccessDeniedAlert = useAvoidAccessDeniedAlert();

  const { address } = useAuth();

  const isSelected = groupAddress === selectedGroup?.address;

  const dispatch = useAppDispatch();

  const onClick = useCallback(async () => {
    // wait till animation ends
    await sleep(200);

    const isPersonalAccountSelected = groupAddress === address;

    const group = isPersonalAccountSelected ? undefined : groupAddress;

    const newUserGroupConfig = {
      address,
      selectedGroupAddress: groupAddress,
      selectedGroupRole: role,
    };

    const isClientFetchParams = {
      group,
      newUserGroupConfig,
    };

    avoidAccessDeniedAlert();

    await dispatch(
      fetchIsEnterpriseClient.initiate(isClientFetchParams, {
        forceRefetch: true,
      }),
    );

    resetEndpoint('fetchPremiumStatus', dispatch);

    onSelect();
  }, [address, dispatch, groupAddress, onSelect, role, avoidAccessDeniedAlert]);

  return { isSelected, onClick };
};

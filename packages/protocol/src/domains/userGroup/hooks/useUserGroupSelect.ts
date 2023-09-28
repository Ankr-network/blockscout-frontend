import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GroupUserRole, UserGroup } from 'multirpc-sdk';

import { resetUserGroupConfig } from 'domains/userGroup/store';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { fetchIsEnterpriseClient } from 'domains/enterprise/actions/fetchIsEnterpriseClient';

import { useUserGroupConfig } from './useUserGroupConfig';
import { shouldShowUserGroupDialog } from '../actions/shouldShowUserGroupDialog';

export const useUserGroupSelect = (groups: UserGroup[], isLoading: boolean) => {
  const { address } = useAuth();
  const dispatch = useDispatch();

  const {
    shouldRemind: savedShouldRemind,
    selectedGroupAddress: savedSelectedGroupAddress,
    selectedGroupRole: savedSelectedGroupRole,
  } = useUserGroupConfig();

  const [selectedGroupAddress, setSelectedGroupAddress] = useState<
    string | undefined
  >(savedSelectedGroupAddress);

  const [selectedGroupRole, setSelectedGroupRole] = useState<
    GroupUserRole | undefined
  >(savedSelectedGroupRole);

  const [shouldRemind, setShouldRemind] = useState<boolean | undefined>(
    savedShouldRemind,
  );

  useEffect(() => {
    if (savedSelectedGroupAddress && !isLoading && groups.length > 0) {
      const group = groups.find(
        ({ groupAddress }) => groupAddress === savedSelectedGroupAddress,
      );

      /* we need to reset config in case if user was removed from group */
      if (!group) {
        dispatch(resetUserGroupConfig(address));
        setSelectedGroupAddress(undefined);
        setSelectedGroupRole(undefined);
        setShouldRemind(undefined);
      }
    }
  }, [address, dispatch, groups, isLoading, savedSelectedGroupAddress]);

  const handleSetUserGroup = useCallback(async () => {
    const isPersonalAccountSelected =
      selectedGroupAddress === address || !selectedGroupAddress;

    const group = isPersonalAccountSelected ? undefined : selectedGroupAddress;

    const newUserGroupConfig = {
      address,
      selectedGroupAddress,
      selectedGroupRole,
      shouldRemind,
    };

    const fetchEnterpriseStatusParams = {
      group,
      newUserGroupConfig,
    };

    await dispatch(
      fetchIsEnterpriseClient.initiate(fetchEnterpriseStatusParams),
    );

    dispatch(shouldShowUserGroupDialog.initiate());
  }, [
    dispatch,
    address,
    selectedGroupAddress,
    selectedGroupRole,
    shouldRemind,
  ]);

  const handleRememberChoice = useCallback(() => {
    setShouldRemind(oldShouldRemind => !oldShouldRemind);
  }, []);

  const handleGroupSelect = useCallback(
    (groupAddress: string, userRole: GroupUserRole) => {
      setSelectedGroupAddress(groupAddress);
      setSelectedGroupRole(userRole);
    },
    [],
  );

  return {
    selectedAddress: selectedGroupAddress,
    selectedRole: selectedGroupRole,
    shouldRemind,
    handleGroupSelect,
    handleRememberChoice,
    handleSetUserGroup,
  };
};

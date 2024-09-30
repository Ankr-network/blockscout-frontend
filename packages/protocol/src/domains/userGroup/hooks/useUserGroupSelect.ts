import { useCallback, useEffect, useState } from 'react';
import { GroupUserRole, UserGroup } from 'multirpc-sdk';

import { fetchIsEnterpriseClient } from 'domains/enterprise/actions/fetchIsEnterpriseClient';
import { resetEndpoint } from 'store/utils/resetEndpoint';
import { resetUserGroupConfig } from 'domains/userGroup/store';
import { useAppDispatch } from 'store/useAppDispatch';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { getPermissions } from 'modules/groups/utils/getPermissions';

import { BlockWithPermission } from '../constants/groups';
import { shouldShowUserGroupDialog } from '../actions/shouldShowUserGroupDialog';
import { useUserGroupConfig } from './useUserGroupConfig';
import { useAvoidAccessDeniedAlert } from './useAvoidAccessDeniedAlert';

export const useUserGroupSelect = (groups: UserGroup[], isLoading: boolean) => {
  const { address } = useAuth();
  const dispatch = useAppDispatch();
  const avoidAccessDeniedAlert = useAvoidAccessDeniedAlert();

  const {
    selectedGroupAddress: savedSelectedGroupAddress,
    selectedGroupRole: savedSelectedGroupRole,
    shouldRemind: savedShouldRemind,
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
        ({ address: groupAddress }) =>
          groupAddress === savedSelectedGroupAddress,
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

    avoidAccessDeniedAlert();

    await dispatch(
      fetchIsEnterpriseClient.initiate(fetchEnterpriseStatusParams, {
        forceRefetch: true,
      }),
    );

    dispatch(
      shouldShowUserGroupDialog.initiate(undefined, { forceRefetch: true }),
    );
  }, [
    avoidAccessDeniedAlert,
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

      const permissions = getPermissions(userRole);
      const hasAccountStatusPermission = permissions.includes(
        BlockWithPermission.AccountStatus,
      );

      if (!hasAccountStatusPermission) {
        resetEndpoint('fetchPremiumStatus', dispatch);
      }
    },
    [dispatch],
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

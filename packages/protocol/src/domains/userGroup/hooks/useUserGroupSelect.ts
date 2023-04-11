import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setUserGroupConfig } from 'domains/userGroup/store';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useUserGroupConfig } from './useUserGroupConfig';
import { shouldShowUserGroupDialog } from '../actions/shouldShowUserGroupDialog';
import { GroupUserRole } from 'multirpc-sdk';

export const useUserGroupSelect = () => {
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

  const handleSetUserGroup = useCallback(() => {
    dispatch(
      setUserGroupConfig({
        address,
        selectedGroupAddress,
        selectedGroupRole,
        shouldRemind,
      }),
    );
    dispatch(shouldShowUserGroupDialog.initiate());

    // we should refetch all data on changing the user group
    window.location.reload();
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

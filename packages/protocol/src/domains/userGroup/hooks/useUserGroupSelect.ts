import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setUserGroupConfig } from 'domains/userGroup/store/userGroupSlice';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useUserGroupConfig } from './useUserGroupConfig';
import { shouldShowUserGroupDialog } from '../actions/shouldShowUserGroupDialog';

export const useUserGroupSelect = () => {
  const { address } = useAuth();
  const dispatch = useDispatch();

  const {
    shouldRemind: savedShouldRemind,
    selectedGroupAddress: savedSelectedGroupAddress,
  } = useUserGroupConfig();

  const [selectedGroupAddress, setSelectedGroupAddress] = useState<
    string | undefined
  >(savedSelectedGroupAddress);

  const [shouldRemind, setShouldRemind] = useState<boolean | undefined>(
    savedShouldRemind,
  );

  const handleSetUserGroup = useCallback(() => {
    dispatch(
      setUserGroupConfig({
        address,
        selectedGroupAddress,
        shouldRemind,
      }),
    );
    dispatch(shouldShowUserGroupDialog.initiate());
  }, [dispatch, selectedGroupAddress, shouldRemind, address]);

  const handleRememberChoice = useCallback(() => {
    setShouldRemind(oldShouldRemind => !oldShouldRemind);
  }, []);

  const handleGroupSelect = useCallback((groupAddress: string) => {
    setSelectedGroupAddress(groupAddress);
  }, []);

  return {
    selectedAddress: selectedGroupAddress,
    shouldRemind,
    handleGroupSelect,
    handleRememberChoice,
    handleSetUserGroup,
  };
};

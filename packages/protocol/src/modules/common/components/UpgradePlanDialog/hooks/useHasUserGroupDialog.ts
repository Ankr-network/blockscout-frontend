import { shouldShowUserGroupDialog } from 'domains/userGroup/actions/shouldShowUserGroupDialog';
import { useAppSelector } from 'store/useAppSelector';
import { useAuth } from 'domains/auth/hooks/useAuth';

export const useHasUserGroupDialog = () => {
  const { isLoggedIn } = useAuth();
  const {
    data = true,
    isLoading,
    isUninitialized,
  } = useAppSelector(shouldShowUserGroupDialog.select());

  return isLoggedIn && (isLoading || isUninitialized || data);
};

import { shouldShowUserGroupDialog } from 'domains/userGroup/actions/shouldShowUserGroupDialog';
import { UserGroupDialog } from './UserGroupDialog';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

export const UserGroupDialogContainer = () => {
  const [, { data: shouldShowDialog }] = useQueryEndpoint(
    shouldShowUserGroupDialog,
  );

  return shouldShowDialog ? <UserGroupDialog /> : null;
};

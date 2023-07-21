import { shouldShowUserGroupDialog } from 'domains/userGroup/actions/shouldShowUserGroupDialog';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

import { UserGroupDialog } from './UserGroupDialog';

export const UserGroupDialogContainer = () => {
  const [, { data: shouldShowDialog }] = useQueryEndpoint(
    shouldShowUserGroupDialog,
  );

  return shouldShowDialog ? <UserGroupDialog /> : null;
};

import { t } from '@ankr.com/common';

import { Dialog } from 'uiKit/Dialog';
import { userGroupFetchGroups } from 'domains/userGroup/actions/fetchGroups';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

import { useUserGroupDialogStyles } from './useUserGroupDialogStyles';
import { UserGroupDialogContent } from './components/UserGroupDialogContent';

const DIALOG_WIDTH = 620;

export const UserGroupDialog = () => {
  const [, { data: groups = [], isLoading }] =
    useQueryEndpoint(userGroupFetchGroups);

  const { classes } = useUserGroupDialogStyles();

  return (
    <Dialog
      open
      maxPxWidth={DIALOG_WIDTH}
      shouldHideCloseButton
      title={t('user-group.modal.title')}
      titleClassName={classes.dialogTitle}
      paperClassName={classes.paperRoot}
    >
      <UserGroupDialogContent groups={groups} isLoading={isLoading} />
    </Dialog>
  );
};

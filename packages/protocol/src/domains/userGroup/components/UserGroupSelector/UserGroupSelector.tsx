import { GroupMenu } from './components/GroupMenu';
import { GroupMenuButton } from './components/GroupMenuButton';
import { selectSelectedUserGroup } from 'domains/userGroup/store/userGroupSlice';
import { useAppSelector } from 'store/useAppSelector';
import { useGroupsMenu } from './hooks/useGroupMenu';

export const UserGroupSelector = () => {
  const { anchorEl, handleOpen, handleClose, open } = useGroupsMenu();

  const selectedGroup = useAppSelector(selectSelectedUserGroup);

  if (!selectedGroup) {
    return null;
  }

  return (
    <>
      <GroupMenuButton isMenuOpen={open} onClick={handleOpen} />
      <GroupMenu anchorEl={anchorEl} onClose={handleClose} open={open} />
    </>
  );
};

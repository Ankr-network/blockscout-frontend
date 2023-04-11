import { GroupMenu } from './components/GroupMenu';
import { GroupMenuButton } from './components/GroupMenuButton';
import { useMenu } from 'modules/common/hooks/useMenu';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export const UserGroupSelector = () => {
  const { anchorEl, handleOpen, handleClose, open } = useMenu();

  const { group: selectedGroup } = useSelectedUserGroup();

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

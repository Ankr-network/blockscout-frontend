import { useMenu } from 'modules/common/hooks/useMenu';

import { GroupMenu } from './components/GroupMenu';
import { GroupMenuButton } from './components/GroupMenuButton';

export const UserAccountSelector = () => {
  const { anchorEl, handleOpen, handleClose, open } = useMenu();

  return (
    <>
      <GroupMenuButton isMenuOpen={open} onClick={handleOpen} />
      <GroupMenu anchorEl={anchorEl} onClose={handleClose} open={open} />
    </>
  );
};

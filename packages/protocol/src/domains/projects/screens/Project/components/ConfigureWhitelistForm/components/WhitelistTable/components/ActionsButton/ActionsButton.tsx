import { WhitelistActionsMenu } from 'domains/projects/components/WhitelistActionsMenu';

import { DeleteWhitelistDialog } from '../DeleteWhitelistDialog';
import {
  UseActionsButtonParams,
  useActionsButton,
} from './hooks/useActionsButton';
import { useActionsButtonStyles } from './useActionsButtonStyles';

export interface ActionsButtonProps extends UseActionsButtonParams {}

export const ActionsButton = ({
  address,
  handleEditSidebarOpening,
}: ActionsButtonProps) => {
  const {
    handleCloseDeleteWhitelistDialog,
    handleCloseWhitelistActionsMenu,
    handleDeleteWhitelistItem,
    handleOpenWhitelistActionsMenu,
    isDeleteWhitelistDialogOpened,
    isDeleting,
    isWhitelistActionsMenuOpened,
    onDelete,
    onEdit,
    whitelistActionsMenuAnchorEl,
  } = useActionsButton({ address, handleEditSidebarOpening });

  const { classes } = useActionsButtonStyles();

  return (
    <div className={classes.root}>
      <WhitelistActionsMenu
        anchorEl={whitelistActionsMenuAnchorEl}
        buttonProps={{ className: classes.button }}
        onClose={handleCloseWhitelistActionsMenu}
        onDelete={onDelete}
        onEdit={onEdit}
        onOpen={handleOpenWhitelistActionsMenu}
        open={isWhitelistActionsMenuOpened}
      />
      <DeleteWhitelistDialog
        handleDelete={handleDeleteWhitelistItem}
        isDeleting={isDeleting}
        isOpened={isDeleteWhitelistDialogOpened}
        onClose={handleCloseDeleteWhitelistDialog}
      />
    </div>
  );
};

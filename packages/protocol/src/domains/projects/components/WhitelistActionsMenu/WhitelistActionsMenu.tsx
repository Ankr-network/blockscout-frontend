import { Delete, Edit } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import {
  MenuButton,
  MenuButtonProps,
  MenuItem,
} from 'modules/common/components/MenuButton';

export interface WhitelistActionsButtonProps extends MenuButtonProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const WhitelistActionsMenu = ({
  anchorEl,
  onClose,
  onDelete,
  onEdit,
  onOpen,
  open,
  ...rest
}: WhitelistActionsButtonProps) => (
  <MenuButton
    anchorEl={anchorEl}
    onClose={onClose}
    onOpen={onOpen}
    open={open}
    {...rest}
  >
    <MenuItem startIcon={<Edit />} onClick={onEdit}>
      {t('projects.whitelist-actions-menu.edit')}
    </MenuItem>
    <MenuItem startIcon={<Delete />} onClick={onDelete}>
      {t('projects.whitelist-actions-menu.delete')}
    </MenuItem>
  </MenuButton>
);

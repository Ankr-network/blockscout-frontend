import { Delete, Edit } from '@ankr.com/ui';
import { t } from '@ankr.com/common';
import { useForm } from 'react-final-form';
import { useCallback } from 'react';

import { MenuButton, MenuItem } from 'modules/common/components/MenuButton';
import { useMenu } from 'modules/common/hooks/useMenu';
import { useProjectFormValues } from 'domains/projects/screens/NewProject/hooks/useProjectFormValues';
import {
  AddToWhitelistFormData,
  WhitelistStepFields,
} from 'domains/projects/store';

interface ActionsMenuProps {
  index: number;
  rowData: AddToWhitelistFormData;
  onWhitelistDialogOpen: () => void;
}

export const ActionsMenu = ({
  index,
  rowData,
  onWhitelistDialogOpen,
}: ActionsMenuProps) => {
  const { anchorEl, handleOpen, handleClose, open } = useMenu();

  const { change } = useForm();
  const { whitelistItems } = useProjectFormValues();

  const handleEditByClick = useCallback(() => {
    change(WhitelistStepFields.indexOfEditingWhitelistItem, index);

    change(WhitelistStepFields.shouldSkipFormReset, true);
    change(WhitelistStepFields.isEditingWhitelistDialog, true);

    change(WhitelistStepFields.whitelistDialog, {
      type: rowData.type,
      value: rowData.value,
      chains: rowData.chains,
    });
    handleClose();
    onWhitelistDialogOpen();
  }, [
    index,
    rowData.type,
    rowData.value,
    rowData.chains,
    change,
    handleClose,
    onWhitelistDialogOpen,
  ]);

  const handleDeleteByClick = useCallback(() => {
    const newWhitelistItems = [...whitelistItems];

    newWhitelistItems.splice(index, 1);
    change(WhitelistStepFields.whitelistItems, newWhitelistItems);
    handleClose();
  }, [index, whitelistItems, change, handleClose]);

  return (
    <MenuButton
      anchorEl={anchorEl}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
    >
      <MenuItem startIcon={<Edit />} onClick={handleEditByClick}>
        {t('projects.new-project.step-2.edit')}
      </MenuItem>

      <MenuItem startIcon={<Delete />} onClick={handleDeleteByClick}>
        {t('projects.new-project.step-2.delete')}
      </MenuItem>
    </MenuButton>
  );
};

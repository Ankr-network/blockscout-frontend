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
import { useProjectConfig } from 'domains/projects/hooks/useProjectConfig';
import { NewProjectStep } from 'domains/projects/types';

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
  const { handleSetStepConfig, project } = useProjectConfig();
  const { anchorEl, handleOpen, handleClose, open } = useMenu();

  const { change, getState, initialize } = useForm();
  const { values } = getState();

  const { whitelistItems } = useProjectFormValues();

  const handleEditByClick = useCallback(() => {
    initialize({
      ...values,
      [WhitelistStepFields.indexOfEditingWhitelistItem]: index,
      [WhitelistStepFields.shouldSkipFormReset]: true,
      [WhitelistStepFields.isEditingWhitelistDialog]: true,
      [WhitelistStepFields.whitelistDialog]: {
        type: rowData.type,
        value: rowData.value,
        chains: rowData.chains,
      },
    });

    handleClose();
    onWhitelistDialogOpen();
  }, [
    index,
    values,
    rowData.type,
    rowData.value,
    rowData.chains,
    initialize,
    handleClose,
    onWhitelistDialogOpen,
  ]);

  const handleDeleteByClick = useCallback(() => {
    const newWhitelistItems = [...whitelistItems];

    newWhitelistItems.splice(index, 1);
    change(WhitelistStepFields.whitelistItems, newWhitelistItems);

    handleSetStepConfig(
      NewProjectStep.Whitelist,
      {
        whitelistItems: newWhitelistItems,
        userEndpointToken:
          project[NewProjectStep.Chain]?.userEndpointToken ?? '',
      },
      NewProjectStep.Plan,
    );
    handleClose();
  }, [
    whitelistItems,
    index,
    change,
    project,
    handleSetStepConfig,
    handleClose,
  ]);

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

import { useForm } from 'react-final-form';
import { useCallback } from 'react';

import { useMenu } from 'modules/common/hooks/useMenu';
import { useProjectFormValues } from 'domains/projects/screens/NewProject/hooks/useProjectFormValues';
import {
  AddToWhitelistFormData,
  WhitelistStepFields,
} from 'domains/projects/store';
import { useProjectConfig } from 'domains/projects/hooks/useProjectConfig';
import { NewProjectStep } from 'domains/projects/types';
import { WhitelistActionsMenu } from 'domains/projects/components/WhitelistActionsMenu';

interface ActionsMenuProps {
  index: number;
  rowData: AddToWhitelistFormData;
  onWhitelistDialogOpen: () => void;
}

export const ActionsMenu = ({
  index,
  onWhitelistDialogOpen,
  rowData,
}: ActionsMenuProps) => {
  const { handleSetStepConfig } = useProjectConfig();
  const { anchorEl, handleClose, handleOpen, open } = useMenu();

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
      },
      NewProjectStep.Whitelist,
    );
    handleClose();
  }, [whitelistItems, index, change, handleSetStepConfig, handleClose]);

  return (
    <WhitelistActionsMenu
      anchorEl={anchorEl}
      onClose={handleClose}
      onDelete={handleDeleteByClick}
      onEdit={handleEditByClick}
      onOpen={handleOpen}
      open={open}
    />
  );
};

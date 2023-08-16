import { useCallback, useEffect } from 'react';
import { useForm } from 'react-final-form';

import { useProjectFormValues } from 'domains/projects/screens/NewProject/hooks/useProjectFormValues';
import {
  WhitelistStepFields,
  initialDialogValues,
} from 'domains/projects/store';

import { MainForm } from './MainForm';

interface AddAndEditWhitelistItemFormProps {
  onClose: () => void;
}

export const AddAndEditWhitelistItemForm = ({
  onClose,
}: AddAndEditWhitelistItemFormProps) => {
  const { change } = useForm();

  const {
    allSelectedChainIds,
    isEditingWhitelistDialog,
    shouldSkipFormReset,
    indexOfEditingWhitelistItem,
    whitelistDialog,
    whitelistItems,
  } = useProjectFormValues();

  const handleFormSubmit = useCallback(() => {
    if (isEditingWhitelistDialog) {
      const newWhitelistItems = [...whitelistItems];

      newWhitelistItems.splice(indexOfEditingWhitelistItem, 1, whitelistDialog);
      change(WhitelistStepFields.whitelistItems, newWhitelistItems);
      change(WhitelistStepFields.isEditingWhitelistDialog, false);
      change(WhitelistStepFields.indexOfEditingWhitelistItem, undefined);
    } else {
      change(WhitelistStepFields.whitelistItems, [
        ...whitelistItems,
        whitelistDialog,
      ]);
    }

    change(WhitelistStepFields.whitelistDialog, initialDialogValues);

    onClose();
  }, [
    change,
    indexOfEditingWhitelistItem,
    isEditingWhitelistDialog,
    onClose,
    whitelistDialog,
    whitelistItems,
  ]);

  useEffect(() => {
    change(WhitelistStepFields.shouldSkipFormReset, undefined);
  }, [change]);

  return (
    <MainForm
      chainIds={allSelectedChainIds}
      shouldSkipFormReset={shouldSkipFormReset}
      handleSubmit={handleFormSubmit}
    />
  );
};

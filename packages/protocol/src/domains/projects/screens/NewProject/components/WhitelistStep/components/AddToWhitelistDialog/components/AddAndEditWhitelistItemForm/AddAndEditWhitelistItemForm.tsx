import { useCallback, useEffect } from 'react';
import { useForm } from 'react-final-form';

import { useProjectFormValues } from 'domains/projects/screens/NewProject/hooks/useProjectFormValues';
import {
  AddToWhitelistFormData,
  WhitelistStepFields,
  initialDialogValues,
} from 'domains/projects/store';
import { useProjectConfig } from 'domains/projects/hooks/useProjectConfig';
import { NewProjectStep } from 'domains/projects/types';

import { MainForm } from './MainForm';

interface AddAndEditWhitelistItemFormProps {
  onClose: () => void;
}

export const AddAndEditWhitelistItemForm = ({
  onClose,
}: AddAndEditWhitelistItemFormProps) => {
  const { handleSetStepConfig, project } = useProjectConfig();
  const { change } = useForm();

  const {
    isEditingWhitelistDialog,
    shouldSkipFormReset,
    indexOfEditingWhitelistItem = 0,
    whitelistDialog,
    whitelistItems,
  } = useProjectFormValues();

  const replaceWhiteListItemWithNewOne = useCallback(
    (
      items: AddToWhitelistFormData[],
      index: number,
      newWhitelistItem: AddToWhitelistFormData,
    ): AddToWhitelistFormData[] => {
      const newItems = [...items];

      newItems.splice(index, 1, newWhitelistItem);

      return newItems;
    },
    [],
  );

  const handleFormSubmit = useCallback(() => {
    let newWhitelistItems = [];

    if (isEditingWhitelistDialog) {
      newWhitelistItems = replaceWhiteListItemWithNewOne(
        whitelistItems,
        indexOfEditingWhitelistItem,
        whitelistDialog,
      );
      change(WhitelistStepFields.isEditingWhitelistDialog, false);
      change(WhitelistStepFields.indexOfEditingWhitelistItem, undefined);
    } else {
      newWhitelistItems = [...whitelistItems, whitelistDialog];
    }

    change(WhitelistStepFields.whitelistItems, newWhitelistItems);

    handleSetStepConfig(
      NewProjectStep.Whitelist,
      {
        whitelistItems: newWhitelistItems,
        userEndpointToken:
          project[NewProjectStep.Chain]?.userEndpointToken ?? '',
        tokenIndex: project[NewProjectStep.Chain]?.tokenIndex,
      },
      NewProjectStep.Whitelist,
    );

    change(WhitelistStepFields.whitelistDialog, initialDialogValues);

    onClose();
  }, [
    change,
    handleSetStepConfig,
    indexOfEditingWhitelistItem,
    isEditingWhitelistDialog,
    onClose,
    project,
    replaceWhiteListItemWithNewOne,
    whitelistDialog,
    whitelistItems,
  ]);

  useEffect(() => {
    change(WhitelistStepFields.shouldSkipFormReset, undefined);
  }, [change]);

  return (
    <MainForm
      shouldSkipFormReset={shouldSkipFormReset}
      handleSubmit={handleFormSubmit}
    />
  );
};

import { useCallback, useEffect } from 'react';
import { useForm } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { t } from '@ankr.com/common';

import { useProjectFormValues } from 'domains/projects/screens/NewProject/hooks/useProjectFormValues';
import {
  AddToWhitelistFormData,
  WhitelistStepFields,
  initialDialogValues,
} from 'domains/projects/store';
import { useProjectConfig } from 'domains/projects/hooks/useProjectConfig';
import { NewProjectStep } from 'domains/projects/types';
import { NotificationActions } from 'domains/notification/store/NotificationActions';

import { MainForm } from './MainForm';

interface AddAndEditWhitelistItemFormProps {
  onClose: () => void;
}

export const AddAndEditWhitelistItemForm = ({
  onClose,
}: AddAndEditWhitelistItemFormProps) => {
  const dispatch = useDispatch();
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

    const whitelistItemsAddresses = whitelistItems.map(item => item.value);

    const doesNewValueExists = whitelistItemsAddresses.includes(
      whitelistDialog.value,
    );

    if (
      (doesNewValueExists && !isEditingWhitelistDialog) ||
      (doesNewValueExists &&
        isEditingWhitelistDialog &&
        whitelistItems[indexOfEditingWhitelistItem].value !==
          whitelistDialog.value)
    ) {
      dispatch(
        NotificationActions.showNotification({
          message: t('projects.new-project.step-2.error-message.duplication'),
          severity: 'error',
        }),
      );

      return;
    }

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
          project[NewProjectStep.Whitelist]?.userEndpointToken ?? '',
      },
      NewProjectStep.Whitelist,
    );

    change(WhitelistStepFields.whitelistDialog, initialDialogValues);

    onClose();
  }, [
    indexOfEditingWhitelistItem,
    isEditingWhitelistDialog,
    project,
    whitelistDialog,
    whitelistItems,
    change,
    dispatch,
    handleSetStepConfig,
    onClose,
    replaceWhiteListItemWithNewOne,
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

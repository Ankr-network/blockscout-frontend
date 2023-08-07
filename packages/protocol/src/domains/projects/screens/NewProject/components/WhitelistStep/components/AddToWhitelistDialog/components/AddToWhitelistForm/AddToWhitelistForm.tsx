import { useCallback, useMemo } from 'react';
import { useForm } from 'react-final-form';

import { useProjectFormValues } from 'domains/projects/screens/NewProject/hooks/useProjectFormValues';
import {
  WhitelistStepFields,
  initialDialogValues,
} from 'domains/projects/store';

import { MainForm } from './MainForm';

interface AddToWhitelistFormProps {
  onClose: () => void;
}

export const AddToWhitelistForm = ({ onClose }: AddToWhitelistFormProps) => {
  const { change } = useForm();

  const { allSelectedChainIds, whitelistDialog, whitelistItems } =
    useProjectFormValues();

  const handleFormSubmit = useCallback(() => {
    change(WhitelistStepFields.whitelistItems, [
      ...whitelistItems,
      whitelistDialog,
    ]);
    change(WhitelistStepFields.whitelistDialog, initialDialogValues);
    onClose();
  }, [change, onClose, whitelistDialog, whitelistItems]);

  const chains = useMemo(() => allSelectedChainIds, [allSelectedChainIds]);

  return <MainForm chainIds={chains} handleSubmit={handleFormSubmit} />;
};

import { useReplaceWhitelistHandler } from 'domains/projects/hooks/useReplaceWhitelistHandler';

import {
  UseWhitelistItemsToEditParams,
  useWhitelistItemsToEdit,
} from './useWhitelistItemsToEdit';

export interface UseEditWhitelistItemsHandlerParams
  extends UseWhitelistItemsToEditParams {
  onSuccess?: () => void;
}

export const useEditWhitelistItemsHandler = ({
  blockchains,
  initialValue,
  initiallySelectedBlockchains,
  onSuccess,
  type,
  value,
  whitelist,
}: UseEditWhitelistItemsHandlerParams) => {
  const { whitelistToReplace } = useWhitelistItemsToEdit({
    blockchains,
    initialValue,
    initiallySelectedBlockchains,
    type,
    value,
    whitelist,
  });

  const {
    handleReplaceWhitelist: handleEditWhitelistItems,
    isReplacing: isEditing,
  } = useReplaceWhitelistHandler({
    onSuccess,
    whitelist: whitelistToReplace,
  });

  return { handleEditWhitelistItems, isEditing };
};

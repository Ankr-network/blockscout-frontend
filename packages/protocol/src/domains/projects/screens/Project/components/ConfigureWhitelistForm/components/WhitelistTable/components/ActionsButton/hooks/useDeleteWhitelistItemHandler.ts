import { WhitelistItem } from 'multirpc-sdk';
import { useMemo } from 'react';

import { useProjectWhitelist } from 'domains/projects/screens/Project/hooks/useProjectWhitelist';
import { useReplaceWhitelistHandler } from 'domains/projects/hooks/useReplaceWhitelistHandler';

export interface UseDeleteWhitelistItemHandlerParams {
  address: string;
  onSuccess: () => void;
}

export const useDeleteWhitelistItemHandler = ({
  address,
  onSuccess,
}: UseDeleteWhitelistItemHandlerParams) => {
  const { projectWhitelist } = useProjectWhitelist({ skipFetching: true });
  const whitelist = projectWhitelist?.lists;

  const whitelistToUpdate = useMemo(
    () =>
      whitelist?.map<WhitelistItem>(whitelistItem => ({
        ...whitelistItem,
        list: whitelistItem.list.filter(value => value !== address),
      })) ?? [],
    [address, whitelist],
  );

  const {
    handleReplaceWhitelist: handleDeleteWhitelistItem,
    isReplacing: isDeleting,
  } = useReplaceWhitelistHandler({
    onSuccess,
    whitelist: whitelistToUpdate,
  });

  return { handleDeleteWhitelistItem, isDeleting };
};

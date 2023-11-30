import { WhitelistItem } from 'multirpc-sdk';
import { useMemo } from 'react';

import { selectProjectWhitelist } from 'domains/projects/store';
import { useAppSelector } from 'store/useAppSelector';
import { useReplaceWhitelistHandler } from 'domains/projects/hooks/useReplaceWhitelistHandler';

export interface UseDeleteWhitelistItemHandlerParams {
  address: string;
  onSuccess: () => void;
}

export const useDeleteWhitelistItemHandler = ({
  address,
  onSuccess,
}: UseDeleteWhitelistItemHandlerParams) => {
  const whitelist = useAppSelector(selectProjectWhitelist);

  const whitelistToUpdate = useMemo(
    () =>
      whitelist.map<WhitelistItem>(whitelistItem => ({
        ...whitelistItem,
        list: whitelistItem.list.filter(value => value !== address),
      })),
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

import { UserEndpointTokenMode, WhitelistItem } from 'multirpc-sdk';
import { useMemo } from 'react';
import { ChainPath } from '@ankr.com/chains-list';

import { useReplaceWhitelistHandler } from 'domains/projects/hooks/useReplaceWhitelistHandler';

export interface UseAddWhitelistItemHandlerParams {
  address: string;
  blockchains: ChainPath[];
  onSuccess?: () => void;
  type: UserEndpointTokenMode;
  whitelist: WhitelistItem[];
}

export const useAddWhitelistItemHandler = ({
  address,
  blockchains,
  onSuccess,
  type,
  whitelist,
}: UseAddWhitelistItemHandlerParams) => {
  const extendedWhitelist = useMemo(() => {
    const whitelistToAdd = blockchains.map<WhitelistItem>(blockchain => ({
      blockchain,
      type,
      list: [address],
    }));

    return [...whitelist, ...whitelistToAdd];
  }, [address, blockchains, type, whitelist]);

  const {
    handleReplaceWhitelist: handleAddItemToProjectWhitelists,
    isReplacing: isAdding,
  } = useReplaceWhitelistHandler({
    onSuccess,
    whitelist: extendedWhitelist,
  });

  return { handleAddItemToProjectWhitelists, isAdding };
};

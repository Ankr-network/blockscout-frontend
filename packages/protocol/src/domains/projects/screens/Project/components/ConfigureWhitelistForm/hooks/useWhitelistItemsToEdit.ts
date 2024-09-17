import { UserEndpointTokenMode, WhitelistItem } from 'multirpc-sdk';
import { useMemo } from 'react';
import { ChainPath } from '@ankr.com/chains-list';

export interface UseWhitelistItemsToEditParams {
  blockchains: ChainPath[];
  initialValue: string;
  initiallySelectedBlockchains: ChainPath[];
  type: UserEndpointTokenMode;
  value: string;
  whitelist: WhitelistItem[];
}

interface GetWhitelistToUpdate
  extends Omit<UseWhitelistItemsToEditParams, 'initiallySelectedBlockchains'> {
  blockchainsToDelete: string[];
}

const getWhitelistToUpdate = ({
  blockchains,
  blockchainsToDelete,
  initialValue,
  type,
  value,
  whitelist,
}: GetWhitelistToUpdate) =>
  whitelist
    .map(item => {
      const { blockchain, list } = item;

      const hasBlockchain = blockchains.includes(blockchain);
      const hasType = type === item.type;
      const hasValue = list.includes(value);

      const shouldEdit = hasBlockchain && hasType && !hasValue;

      if (shouldEdit) {
        return {
          ...item,
          list: [
            ...item.list.filter(listItem => listItem !== initialValue),
            value,
          ],
        };
      }

      const isBlockchainToDelete = blockchainsToDelete.includes(blockchain);
      const shouldDelete = hasType && isBlockchainToDelete;

      if (shouldDelete) {
        return {
          ...item,
          list: item.list.filter(listItem => listItem !== initialValue),
        };
      }

      return item;
    })
    .filter(({ list }) => list.length > 0);

export const useWhitelistItemsToEdit = ({
  blockchains,
  initialValue,
  initiallySelectedBlockchains,
  type,
  value,
  whitelist,
}: UseWhitelistItemsToEditParams) => {
  const blockchainsToAdd = useMemo(
    () =>
      blockchains.filter(
        blockchain =>
          !whitelist.some(
            item => item.blockchain === blockchain && item.type === type,
          ),
      ),
    [blockchains, type, whitelist],
  );

  const blockchainsToDelete = initiallySelectedBlockchains.filter(
    blockchain => !blockchains.includes(blockchain),
  );

  const whitelistToReplace = useMemo(() => {
    const whitelistToUpdate = getWhitelistToUpdate({
      blockchains,
      blockchainsToDelete,
      initialValue,
      type,
      value,
      whitelist,
    });

    const whitelistToAdd = blockchainsToAdd.map<WhitelistItem>(blockchain => ({
      blockchain,
      type,
      list: [value],
    }));

    return [...whitelistToUpdate, ...whitelistToAdd];
  }, [
    blockchains,
    blockchainsToAdd,
    blockchainsToDelete,
    initialValue,
    type,
    value,
    whitelist,
  ]);

  return { whitelistToReplace };
};

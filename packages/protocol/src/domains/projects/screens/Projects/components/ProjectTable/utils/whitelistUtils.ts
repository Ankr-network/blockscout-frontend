import { WhitelistItem } from 'multirpc-sdk';

const DEFAULT_TO_SHOW_BLOCKCHAIN_ICONS_NUMBER = 5;

export const formatBlockchainToString = (whitelist?: WhitelistItem[]) => {
  const blockchains = whitelist?.reduce(
    (acc, listItem) => acc.concat(listItem.blockchain),
    [''],
  );

  blockchains?.splice(0, 1);

  return blockchains?.slice(0, DEFAULT_TO_SHOW_BLOCKCHAIN_ICONS_NUMBER);
};

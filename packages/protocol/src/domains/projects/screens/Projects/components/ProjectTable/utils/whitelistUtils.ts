import { WhitelistItem } from 'multirpc-sdk';

export const formatBlockchainToString = (whitelist?: WhitelistItem[]) => {
  const blockchains = whitelist?.reduce(
    (acc, listItem) => acc.concat(listItem.blockchain),
    [''],
  );

  blockchains?.splice(0, 1);

  return blockchains;
};

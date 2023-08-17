import { StatsByRangeResponse, WhitelistItem } from 'multirpc-sdk';

const MAX_BLOCKCHAIN_ICONS_NUMBER = 5;

export const formatBlockchainToString = (whitelist?: WhitelistItem[]) => {
  const blockchains = whitelist?.reduce(
    (acc, listItem) => acc.concat(listItem.blockchain),
    [''],
  );

  blockchains?.splice(0, 1);

  return blockchains?.slice(0, MAX_BLOCKCHAIN_ICONS_NUMBER);
};

export const getRequests = (stats: StatsByRangeResponse) =>
  Object.entries(stats)
    .sort(
      ([timestampA], [timestampB]) => Number(timestampB) - Number(timestampA),
    )
    .map(([, requests]) => requests);

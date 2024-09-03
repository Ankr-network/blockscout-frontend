import { BlockchainID, IBlockchainEntity } from 'multirpc-sdk';

export const getSubchainIds = (
  blockchains: IBlockchainEntity[],
  chainId?: string,
): BlockchainID[] => {
  const subchains = chainId
    ? blockchains
        .filter(blockchain => blockchain.extends === chainId)
        .map(({ id }) => id)
    : [];

  if (subchains.length === 0) {
    return subchains;
  }

  return [
    ...subchains,
    ...subchains.flatMap(subchainId => getSubchainIds(blockchains, subchainId)),
  ];
};

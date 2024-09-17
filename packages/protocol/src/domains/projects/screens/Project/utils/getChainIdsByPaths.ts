import { IBlockchainEntity, ChainID } from '@ankr.com/chains-list';

import { getUniqueArray } from 'modules/common/utils/getUniqueArray';

export interface GetChainIdsByPathsParams {
  paths: string[];
  blockchains: IBlockchainEntity[];
}

const getBlockchainParentIds = (
  blockchain: IBlockchainEntity,
  blockchains: IBlockchainEntity[],
): ChainID[] => {
  if (blockchain.extends) {
    return [
      blockchain.extends as ChainID,
      ...blockchains
        .filter(({ id }) => id === blockchain.extends)
        .flatMap(rootBlockchain =>
          getBlockchainParentIds(rootBlockchain, blockchains),
        ),
    ];
  }

  return [];
};

export const getChainIdsByPaths = ({
  blockchains,
  paths,
}: GetChainIdsByPathsParams) => {
  const selectedBlockchains = blockchains.filter(blockchain =>
    blockchain.paths?.some(blockchainPath =>
      paths.some(path => blockchainPath === path),
    ),
  );

  const selectedBlockchainIds = selectedBlockchains.map(
    ({ id }) => id as ChainID,
  );

  // to handle mainnet without paths for avalanche, flare etc
  const rootBlockchainIds = selectedBlockchains.flatMap(blockchain =>
    getBlockchainParentIds(blockchain, blockchains),
  );

  return getUniqueArray([...rootBlockchainIds, ...selectedBlockchainIds]);
};

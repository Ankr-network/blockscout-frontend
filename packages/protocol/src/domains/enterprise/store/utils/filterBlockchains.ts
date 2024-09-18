import { BlockchainID } from 'multirpc-sdk';
import { IBlockchainEntity, ChainID } from '@ankr.com/chains-list';

type BlockchainsMap = Record<string, IBlockchainEntity>;

const checkExceptions = (id: BlockchainID, availableIds: string[]) => {
  const isAvalancheEvm = id === ChainID.AVALANCHE_EVM;
  const isAvalancheAvailable = availableIds.includes(ChainID.AVALANCHE);
  const shouldAddAvalancheEvm = isAvalancheEvm && isAvalancheAvailable;

  const isFlareEvm = id === ChainID.FLARE_EVM;
  const isFlareAvailable = availableIds.includes(ChainID.FLARE);
  const shouldAddFlareEvm = isFlareEvm && isFlareAvailable;

  const isAvalancheFujiEvm = id === ChainID.AVALANCHE_FUJI_EVM;
  const isAvalancheFujiAvailable = availableIds.includes(
    ChainID.AVALANCHE_FUJI,
  );
  const shouldAddAvalancheFujiEvm =
    isAvalancheFujiEvm && isAvalancheFujiAvailable;

  const isSecretRpc = id === ChainID.SECRET_RPC;
  const isSecretAvailable = availableIds.includes(ChainID.SECRET);
  const shouldAddSecretRpc = isSecretRpc && isSecretAvailable;

  return (
    shouldAddAvalancheEvm ||
    shouldAddFlareEvm ||
    shouldAddAvalancheFujiEvm ||
    shouldAddSecretRpc
  );
};

const getParents = (map: BlockchainsMap, id: string): string[] => {
  if (map[id]?.extends) {
    return [map[id].extends!, ...getParents(map, map[id].extends!)].filter(
      Boolean,
    );
  }

  return [];
};

export const filterBlockchains = (
  blockchains: IBlockchainEntity[],
  availableIds: string[],
) => {
  const blockchainsMap = blockchains.reduce<BlockchainsMap>(
    (result, blockchain) => {
      result[blockchain.id] = blockchain;

      return result;
    },
    {},
  );

  const availableParentIds = [
    ...new Set(availableIds.flatMap(id => getParents(blockchainsMap, id))),
  ];

  return blockchains
    .filter(({ id }) => {
      const isAvailableId = availableIds.includes(id);
      const isAvailableParentId = availableParentIds.includes(id);
      const isException = checkExceptions(id, availableIds);

      return isAvailableId || isAvailableParentId || isException;
    })
    .map(blockchain => {
      const { id } = blockchain;

      const isAvailableId = availableIds.includes(id);
      const isException = checkExceptions(id, availableIds);

      // Filtered blockchains contain parent chains that are not allowed but
      // they are needed to construct chains list.
      // To hide not allowed endpoints, we have to replace paths and feature
      // arrays by empty array
      const shouldReplacePathsAndFeatures = !isAvailableId && !isException;

      return shouldReplacePathsAndFeatures
        ? { ...blockchain, paths: [], features: [] }
        : blockchain;
    });
};

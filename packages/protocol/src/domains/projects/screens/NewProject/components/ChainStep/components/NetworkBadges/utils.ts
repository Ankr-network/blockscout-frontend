import { Chain, ChainBadge, ChainID } from '@ankr.com/chains-list';

export const getChainsBadges = (
  chains: Chain[],
  selectedIds: ChainID[],
): ChainBadge[] =>
  chains.map(chain => ({
    ...chain,
    isSelected: selectedIds.includes(chain.id),
  }));

interface GetCurrentChainSelectedExtensionsProps {
  chainId: ChainID;
  subChains: Chain[];
  selectedMainnetIds: ChainID[];
}

const getChainsWithoutSecretMainnet = (subChains: Chain[]) => {
  return subChains.filter(chainItem => chainItem.id !== ChainID.SECRET);
};

const getSecretChainExtensions = (
  subChains: Chain[],
  selectedMainnetIds: ChainID[],
) => {
  const chainsWithoutSecretMainnet = getChainsWithoutSecretMainnet(subChains);

  return getChainsBadges(chainsWithoutSecretMainnet, selectedMainnetIds);
};

export const getCurrentChainSelectedExtensions = ({
  chainId,
  selectedMainnetIds,
  subChains,
}: GetCurrentChainSelectedExtensionsProps) => {
  if (chainId === ChainID.SECRET) {
    // for ChainID.SECRET we need only extenders so filtering mainnet from list
    return getSecretChainExtensions(subChains, selectedMainnetIds);
  }

  return getChainsBadges(subChains, selectedMainnetIds);
};

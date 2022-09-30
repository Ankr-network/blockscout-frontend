import { SortType } from 'domains/chains/types';
import { ChainID } from 'modules/chains/types';
import { Chain, ChainsListProps, SortChainsParams } from './ChainsListTypes';

export const PERIOD = '24h';

export const formatChains = (data: ChainsListProps['chains']): Chain[] => {
  if (!Array.isArray(data) || data.length === 0) return [];

  return data.map(item => {
    const {
      coinName,
      icon,
      id,
      isArchive,
      extenders,
      extensions,
      name,
      totalRequests,
      urls,
    } = item;

    return {
      coinName,
      icon,
      id,
      isArchive,
      extenders,
      extensions,
      name,
      totalRequests,
      urls,
    };
  });
};

const publicChainsSorter = (a: Chain, b: Chain) =>
  (b?.totalRequests?.toNumber() || 0) - (a?.totalRequests?.toNumber() || 0);

const extractMultichain = (chains: Chain[]) =>
  chains.reduce<[Chain[], Chain | undefined]>(
    (acc, chain) => {
      if (chain.id === ChainID.MULTICHAIN) {
        acc[1] = chain;
      } else {
        acc[0].push(chain);
      }

      return acc;
    },
    [[], undefined],
  );

export const sortChains = ({
  chains: rawChains = [],
  isWalletConnected,
  sortType,
  stats,
}: SortChainsParams): Chain[] => {
  if (!Array.isArray(rawChains)) return [];

  const [chains, multichain] = extractMultichain(rawChains);

  const privateChainsSorter = (a: Chain, b: Chain) =>
    (stats[b.id]?.total_requests || 0) - (stats[a.id]?.total_requests || 0);

  const usageSorter = isWalletConnected
    ? privateChainsSorter
    : publicChainsSorter;

  const sorter = sortType === SortType.Usage ? usageSorter : () => 0;

  const sortedChains = [...chains].sort(sorter);

  return multichain ? [multichain, ...sortedChains] : sortedChains;
};

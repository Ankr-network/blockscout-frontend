import { BlockchainType } from 'multirpc-sdk';

import { Chain, ChainsListProps, SortChainsParams } from './ChainsListTypes';
import { SortType } from 'domains/chains/types';
import { ChainID } from 'modules/chains/types';
import BigNumber from 'bignumber.js';

export const PERIOD = '24h';

export const formatChains = (data: ChainsListProps['chains']): Chain[] => {
  if (!Array.isArray(data) || data.length === 0) return [];

  return data.map(item => {
    const {
      coinName,
      extenders,
      extensions,
      frontChain = {},
      icon,
      id,
      isArchive,
      name,
      totalRequests,
      type,
      urls,
    } = item;

    return {
      coinName,
      extenders,
      extensions,
      frontChain,
      icon,
      isArchive,
      name,
      totalRequests,
      type,
      urls,
      ...frontChain,
      id,
    };
  });
};

export const formatPublicRequestsCount = (
  chains: ChainsListProps['chains'],
  data: Record<ChainID, string>,
) => {
  chains.map(item => {
    const { id, frontChain: { id: frontChainId } = {} } = item;

    item.totalRequests = new BigNumber(data?.[frontChainId ?? id] ?? 0);

    return item;
  });

  return formatChains(chains);
};

const publicChainsSorter = (a: Chain, b: Chain) =>
  (b?.totalRequests?.toNumber() || 0) - (a?.totalRequests?.toNumber() || 0);

const extractCustomizedChains = (chains: Chain[]) =>
  chains.reduce<[Chain[], Chain[]]>(
    (acc, chain) => {
      if (chain.type === BlockchainType.Customized) {
        acc[1].push(chain);
      } else {
        acc[0].push(chain);
      }

      return acc;
    },
    [[], []],
  );

const getChainId = ({ id, frontChain: { id: frontChainId } = {} }: Chain) =>
  frontChainId || id;

export const sortChains = ({
  chains: rawChains = [],
  hasCredentials,
  sortType,
  stats,
}: SortChainsParams): Chain[] => {
  if (!Array.isArray(rawChains)) return [];

  const [chains, customizedChains] = extractCustomizedChains(rawChains);

  const privateChainsSorter = (a: Chain, b: Chain) =>
    (stats[getChainId(b)]?.total_requests || 0) -
    (stats[getChainId(a)]?.total_requests || 0);

  const usageSorter = hasCredentials ? privateChainsSorter : publicChainsSorter;

  const sorter = sortType === SortType.Usage ? usageSorter : () => 0;

  const sortedChains = [...chains].sort(sorter);

  return [...customizedChains, ...sortedChains];
};

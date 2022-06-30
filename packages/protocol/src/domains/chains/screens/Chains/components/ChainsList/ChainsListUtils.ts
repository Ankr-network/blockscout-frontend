import { ChainsListProps, Chain, SortChainsParams } from './ChainsListTypes';
import { SortType } from 'domains/chains/types';

export const PERIOD = '24h';

export const formatChains = (data: ChainsListProps['chains']): Chain[] => {
  if (!Array.isArray(data) || data.length === 0) return [];

  return data.map(item => {
    const {
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

const chainNameCoinMap = {
  avalanche: 'avax',
  ethereum: 'eth',
  bsc: 'bnb',
  fantom: 'ftm',
  gnosis: 'gno',
  harmony: 'one',
  iotex: 'IOTX',
  metis: 'mts',
  moonbeam: 'glmr',
  near: 'near',
  nervos: 'ckb',
  polygon: 'matic',
  solana: 'sol',
  syscoin: 'sys',
};

export type TChainName = keyof typeof chainNameCoinMap;

export const getChainCoin = (chainName: TChainName) => {
  return chainNameCoinMap[chainName.toLowerCase() as TChainName] || chainName;
};

const publicChainsSorter = (a: Chain, b: Chain) =>
  (b?.totalRequests?.toNumber() || 0) - (a?.totalRequests?.toNumber() || 0);

export const sortChains = ({
  chains = [],
  isWalletConnected,
  sortType,
  stats,
}: SortChainsParams): Chain[] => {
  if (!Array.isArray(chains)) return [];

  const privateChainsSorter = (a: Chain, b: Chain) =>
    (stats[b.id]?.totalRequests || 0) - (stats[a.id]?.totalRequests || 0);

  if (sortType === SortType.Usage) {
    return [...chains].sort(
      isWalletConnected ? privateChainsSorter : publicChainsSorter,
    );
  }

  return chains;
};

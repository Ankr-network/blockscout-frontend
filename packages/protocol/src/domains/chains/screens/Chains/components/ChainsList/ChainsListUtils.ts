import { SortType } from '../ChainsSortSelect/ChainsSortSelectUtils';
import { ChainsListProps, Chain } from './ChainsListTypes';

export const PERIOD = '24h';

export const formatChains = (data: ChainsListProps['data']): Chain[] => {
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
  arbitrum: 'aeth',
  optimism: 'op',
};

export type TChainName = keyof typeof chainNameCoinMap;

export const getChainCoin = (chainName: TChainName) => {
  return chainNameCoinMap[chainName.toLowerCase() as TChainName] || chainName;
};

export const sortChains = (data: Chain[], sortType: SortType): Chain[] => {
  if (!Array.isArray(data) || data.length === 0) return [];

  if (sortType === SortType.Usage) {
    return [...data].sort(
      (a, b) =>
        (b?.totalRequests?.toNumber() || 0) -
        (a?.totalRequests?.toNumber() || 0),
    );
  }

  return data;
};

import BigNumber from 'bignumber.js';
import { IChainTotalRequests } from 'domains/chains/actions/fetchChainTotalRequests';
import { ChainsListProps, Chain } from './ChainsListTypes';

export const PERIOD = '24h';

export const formatChains = (data: ChainsListProps['data']): Chain[] => {
  if (!Array.isArray(data) || data.length === 0) return [];

  return data.map(item => {
    const {
      id,
      icon,
      name,
      rpcUrls,
      wsUrls,
      requests,
      totalRequest,
      isArchive,
    } = item;
    const rpcLinks = wsUrls.length > 0 ? [...rpcUrls, ...wsUrls] : rpcUrls;

    return {
      id,
      icon,
      name,
      rpcLinks,
      requests,
      totalRequest,
      isArchive,
    };
  });
};

export const calcuateTotalRequest = (
  chainInfo: IChainTotalRequests[],
): BigNumber => {
  const allRequsts = chainInfo
    ?.map((item: IChainTotalRequests) => item.totalRequests)
    .reduce(
      (request: BigNumber, totalRequests: BigNumber) =>
        request.plus(totalRequests),
      new BigNumber(0),
    );

  return allRequsts;
};

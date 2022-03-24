import BigNumber from 'bignumber.js';
import { IChainTotalRequests } from 'domains/chains/actions/fetchChainTotalRequests';
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
      requests,
      totalRequest,
      urls,
    } = item;

    return {
      icon,
      id,
      isArchive,
      extenders,
      extensions,
      name,
      requests,
      totalRequest,
      urls,
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

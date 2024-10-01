import { ChainPath } from '@ankr.com/chains-list';

import { getUniqueArray } from 'modules/common/utils/getUniqueArray';

import { clearPathPrefix } from './clearPathPrefix';

export function getPathsFromChains<T extends { paths?: string[] }>(
  blockchains: T[],
): ChainPath[] {
  const allChainPaths = blockchains
    ?.flatMap(blockchain => {
      const chainPaths = blockchain?.paths?.filter(Boolean);

      if (!chainPaths) {
        return [];
      }

      const chainPathsProcessed = chainPaths
        .flatMap(clearPathPrefix)
        .filter(item => item.length !== 0);

      return chainPathsProcessed;
    })
    .filter(Boolean);

  if (!allChainPaths) return [];

  return getUniqueArray([...allChainPaths]);
}

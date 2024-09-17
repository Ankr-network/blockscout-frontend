import { Chain, ChainPath } from '@ankr.com/chains-list';

import { hasAllowedPaths } from './hasAllowedPaths';
import { clearPathPrefix } from './clearPathPrefix';

export interface FilterChainsByPathsParams {
  chain: Chain;
  paths: ChainPath[];
}

type FilterChainByPathsFN = (params: FilterChainsByPathsParams) => Chain;

const filterSubChainsByPaths = (
  chains: Chain[] = [],
  paths: ChainPath[],
  mapper: FilterChainByPathsFN,
) =>
  chains
    .filter(chain => {
      const hasPaths = Boolean(chain.paths && chain.paths.length > 0);

      return Boolean(!hasPaths || hasAllowedPaths(chain, paths));
    })
    .map(chain => mapper({ chain, paths }));

export const filterChainByPaths: FilterChainByPathsFN = ({ chain, paths }) => ({
  ...chain,
  paths: chain.paths?.filter(path => paths.includes(clearPathPrefix(path))),
  beacons: filterSubChainsByPaths(chain.beacons, paths, filterChainByPaths),
  beaconsTestnet: filterSubChainsByPaths(
    chain.testnets?.flatMap(({ beacons = [] }) => beacons),
    paths,
    filterChainByPaths,
  ),
  devnets: filterSubChainsByPaths(chain.devnets, paths, filterChainByPaths),
  extenders: filterSubChainsByPaths(chain.extenders, paths, filterChainByPaths),
  extensions: filterSubChainsByPaths(
    chain.extensions,
    paths,
    filterChainByPaths,
  ),
  opnodes: filterSubChainsByPaths(chain.opnodes, paths, filterChainByPaths),
  opnodesTestnet: filterSubChainsByPaths(
    chain.testnets?.flatMap(({ opnodes = [] }) => opnodes),
    paths,
    filterChainByPaths,
  ),
  testnets: filterSubChainsByPaths(chain.testnets, paths, filterChainByPaths),
});

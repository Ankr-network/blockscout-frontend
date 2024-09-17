import { Chain } from '@ankr.com/chains-list';

import { hasAllowedPaths } from './hasAllowedPaths';

export interface FilterChainsByPathsParams {
  chains: Chain[];
  paths: string[];
}

export const filterChainsByPaths = ({
  chains,
  paths,
}: FilterChainsByPathsParams): Chain[] =>
  chains.filter(
    chain =>
      hasAllowedPaths(chain, paths) ||
      filterChainsByPaths({ chains: chain.beacons || [], paths }).length > 0 ||
      filterChainsByPaths({ chains: chain.devnets || [], paths }).length > 0 ||
      filterChainsByPaths({ chains: chain.testnets || [], paths }).length > 0 ||
      filterChainsByPaths({ chains: chain.extenders || [], paths }).length >
        0 ||
      filterChainsByPaths({ chains: chain.extensions || [], paths }).length >
        0 ||
      filterChainsByPaths({ chains: chain.opnodes || [], paths }).length > 0,
  );

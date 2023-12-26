import { useMemo } from 'react';

import { clearPathPrefix } from 'modules/chains/utils/clearPathPrefix';
import { filterChainByPaths } from 'modules/chains/utils/filterChainByPaths';
import { flatChains } from 'modules/chains/utils/flatChains';
import {
  kavaTendermintRpcChains,
  tendermintRpcChains,
} from 'modules/endpoints/constants/groups';
import { useProjectChainsContext } from 'domains/projects/screens/Project/hooks/useProjectChainsContext';

export const useSubchains = () => {
  const { paths: projectPaths, projectChains } = useProjectChainsContext();

  const subchainsWithoutTendermintRpcChains = useMemo(() => {
    const allowedChains = projectChains.map(chain =>
      filterChainByPaths({ chain, paths: projectPaths }),
    );

    return flatChains(allowedChains).filter(
      ({ id, paths = [] }) =>
        paths.length > 0 &&
        !tendermintRpcChains.includes(id) &&
        !kavaTendermintRpcChains.includes(id),
    );
  }, [projectChains, projectPaths]);

  const subchainsPaths = useMemo(
    () => [
      ...new Set(
        subchainsWithoutTendermintRpcChains.flatMap(({ paths = [] }) =>
          paths.map(clearPathPrefix),
        ),
      ),
    ],
    [subchainsWithoutTendermintRpcChains],
  );

  return { subchains: subchainsWithoutTendermintRpcChains, subchainsPaths };
};

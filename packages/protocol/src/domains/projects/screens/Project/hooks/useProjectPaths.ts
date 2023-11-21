import { useMemo } from 'react';

import {
  ProjectPathsParams,
  getProjectPaths,
} from 'domains/projects/utils/getProjectPaths';

export const useProjectPaths = ({
  chains,
  projectBlockchains,
  whitelist,
}: ProjectPathsParams) =>
  useMemo(
    () => getProjectPaths({ chains, projectBlockchains, whitelist }),
    [chains, projectBlockchains, whitelist],
  );

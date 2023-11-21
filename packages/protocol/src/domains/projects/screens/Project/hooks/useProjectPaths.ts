import { useMemo } from 'react';

import {
  ProjectPathsParams,
  getProjectPaths,
} from 'domains/projects/utils/getProjectPaths';

export const useProjectPaths = ({
  chains,
  projectBlockchains,
}: ProjectPathsParams) =>
  useMemo(
    () => getProjectPaths({ chains, projectBlockchains }),
    [chains, projectBlockchains],
  );

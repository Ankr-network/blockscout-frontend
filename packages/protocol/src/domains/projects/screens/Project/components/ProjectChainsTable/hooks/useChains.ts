import { useMemo } from 'react';

import { getFilteredChainsByName } from 'modules/common/utils/getFilteredChainsByName';
import { useProjectChains } from 'domains/projects/screens/NewProject/hooks/useProjectChains';

export const useChains = (searchContent = '') => {
  const { projectChains } = useProjectChains(true);

  return useMemo(
    () =>
      projectChains.filter(chain =>
        getFilteredChainsByName(chain, searchContent),
      ),
    [projectChains, searchContent],
  );
};

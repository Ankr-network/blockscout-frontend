import { useCallback } from 'react';
import { useHistory } from 'react-router';

import { ChainsRoutesConfig } from 'domains/chains/routes';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';

const path = ChainsRoutesConfig.chains.generatePath();
const projectsPath = ProjectsRoutesConfig.projects.generatePath();

export const useClickHandler = (isWhitelistReason: boolean) => {
  const history = useHistory();

  return useCallback(
    () => history.push(isWhitelistReason ? projectsPath : path),
    [history, isWhitelistReason],
  );
};

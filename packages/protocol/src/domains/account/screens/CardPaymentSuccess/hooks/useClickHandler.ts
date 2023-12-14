import { useCallback } from 'react';
import { useHistory } from 'react-router';

import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { AccountRoutesConfig } from 'domains/account/Routes';

const projectPath = ProjectsRoutesConfig.projects.generatePath();
const accountPath = AccountRoutesConfig.accountDetails.generatePath();

export const useClickHandler = (hasProjectAccess: boolean) => {
  const history = useHistory();

  return useCallback(
    () => history.push(hasProjectAccess ? projectPath : accountPath),
    [history, hasProjectAccess],
  );
};

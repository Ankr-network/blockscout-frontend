import { useCallback } from 'react';
import { useHistory } from 'react-router';

import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';

const path = ProjectsRoutesConfig.projects.generatePath();

export const useClickHandler = () => {
  const history = useHistory();

  return useCallback(() => history.push(path), [history]);
};

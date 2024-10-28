import { useEffect } from 'react';
import { useHistory } from 'react-router';

import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { selectIsSelectedUserGroupPersonal } from 'domains/userGroup/store';
import { useAppSelector } from 'store/useAppSelector';

export const useRedirectForNotPersonalGroup = () => {
  const isPersonalGroup = useAppSelector(selectIsSelectedUserGroupPersonal);

  const history = useHistory();

  useEffect(() => {
    if (!isPersonalGroup) {
      history.push(ProjectsRoutesConfig.projects.generatePath());
    }
  }, [history, isPersonalGroup]);
};

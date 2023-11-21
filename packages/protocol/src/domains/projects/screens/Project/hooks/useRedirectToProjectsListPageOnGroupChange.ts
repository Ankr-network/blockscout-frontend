import { useEffect, useRef } from 'react';
import { useHistory } from 'react-router';

import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';

export const useRedirectToProjectsListPageOnGroupChange = () => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();
  const history = useHistory();

  const groupRef = useRef(group);

  useEffect(() => {
    const isGroupChanged = groupRef.current !== group;

    if (isGroupChanged) {
      groupRef.current = group;
      history.push(ProjectsRoutesConfig.projects.generatePath());
    }
  }, [history, group]);
};

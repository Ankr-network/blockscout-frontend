import { useEffect, useRef } from 'react';
import { useHistory } from 'react-router';

import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';
import { ESettingsContentType } from 'domains/userSettings/types';
import { useContinueTeamCreationFlow } from 'modules/groups/hooks/useContinueTeamCreationFlow';

export const useRedirectToProjectsListPageOnGroupChange = () => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();
  const history = useHistory();

  const groupRef = useRef(group);

  const { canContinueTeamCreationFlow } = useContinueTeamCreationFlow();

  useEffect(() => {
    const isGroupChanged = groupRef.current !== group;

    if (canContinueTeamCreationFlow) {
      history.push(
        UserSettingsRoutesConfig.settings.generatePath(
          ESettingsContentType.Teams,
        ),
      );
    }

    if (isGroupChanged && !canContinueTeamCreationFlow) {
      groupRef.current = group;
      history.push(ProjectsRoutesConfig.projects.generatePath());
    }
  }, [history, group, canContinueTeamCreationFlow]);
};

import { useCallback } from 'react';
import { useHistory } from 'react-router';

import { JWT } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { selectDraftUserEndpointToken } from 'domains/projects/store';
import { useAppSelector } from 'store/useAppSelector';

export const useRedirectToProject = () => {
  const { push } = useHistory();

  const draftUserEndpointToken = useAppSelector(selectDraftUserEndpointToken);

  return useCallback(
    (rowData: JWT) => {
      const { userEndpointToken } = rowData;
      const isDraft = userEndpointToken === draftUserEndpointToken;

      if (isDraft) {
        return push(ProjectsRoutesConfig.newProject.generatePath());
      }

      return push(ProjectsRoutesConfig.project.generatePath(userEndpointToken));
    },
    [draftUserEndpointToken, push],
  );
};

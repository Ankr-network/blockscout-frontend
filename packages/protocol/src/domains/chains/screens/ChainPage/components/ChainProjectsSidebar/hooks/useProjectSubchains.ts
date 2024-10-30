import { ChainPath } from '@ankr.com/chains-list';
import { UserEndpointToken } from 'multirpc-sdk';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useJWTsManager } from 'domains/jwtToken/hooks/useJWTsManager';
import { useProjectsWhitelistsBlockchains } from 'domains/projects/hooks/useProjectsWhitelistsBlockchains';

export type IProjectSubchains = Record<UserEndpointToken, ChainPath[]>;

export const useProjectSubchains = () => {
  const { jwts: projects } = useJWTsManager();
  const { projectsWhitelistsBlockchains } = useProjectsWhitelistsBlockchains({
    projects,
    skipFetching: true,
  });

  const initialSubchains: IProjectSubchains = useMemo(
    () =>
      projects?.reduce(
        (acc, project) => ({
          ...acc,
          [project.userEndpointToken]:
            projectsWhitelistsBlockchains.find(
              ({ userEndpointToken }) =>
                userEndpointToken === project.userEndpointToken,
            )?.blockchains ?? [],
        }),
        {},
      ),
    [projects, projectsWhitelistsBlockchains],
  );

  const [projectSubchains, setProjectSubchains] = useState(initialSubchains);

  useEffect(() => {
    setProjectSubchains(initialSubchains);
  }, [initialSubchains]);

  const setSelectedSubchains = useCallback(
    (subchains: ChainPath[] = [], projectToken: UserEndpointToken) => {
      setProjectSubchains(currentProjectSubchains => ({
        ...currentProjectSubchains,
        [projectToken]: subchains,
      }));
    },
    [],
  );

  return { selectedSubchains: projectSubchains, setSelectedSubchains };
};

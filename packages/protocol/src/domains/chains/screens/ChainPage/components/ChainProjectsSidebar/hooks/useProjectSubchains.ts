import { ChainPath } from '@ankr.com/chains-list';
import { UserEndpointToken } from 'multirpc-sdk';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { selectAllProjects } from 'domains/projects/store/WhitelistsSelector';
import { useAppSelector } from 'store/useAppSelector';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export type IProjectSubchains = Record<UserEndpointToken, ChainPath[]>;

export const useProjectSubchains = () => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();
  const allProjects = useAppSelector(state =>
    selectAllProjects(state, { group }),
  );

  const initialSubchains: IProjectSubchains = useMemo(
    () =>
      allProjects?.reduce(
        (acc, project) => ({
          ...acc,
          [project.userEndpointToken]: project.blockchains,
        }),
        {},
      ),
    [allProjects],
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

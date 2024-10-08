import { ChainPath } from '@ankr.com/chains-list';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { UserEndpointToken } from 'multirpc-sdk';

import { useAppSelector } from 'store/useAppSelector';
import { selectAllProjects } from 'domains/projects/store/WhitelistsSelector';

export type IProjectSubchains = Record<UserEndpointToken, ChainPath[]>;

export const useProjectSubchains = () => {
  const allProjects = useAppSelector(selectAllProjects);

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

  const [projectSubchains, setProjectSubchains] =
    useState<IProjectSubchains>(initialSubchains);

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

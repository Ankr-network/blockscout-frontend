import { useMemo } from 'react';

import { ProjectStatus } from 'domains/projects/utils/getAllProjects';
import { ProjectStatusLabelType } from 'domains/projects/const';
import { useAppSelector } from 'store/useAppSelector';
import { selectIsInactiveStatus } from 'domains/auth/store';

export const useProjectStatusLabel = (status: ProjectStatus) => {
  const isInactive = useAppSelector(selectIsInactiveStatus);

  const projectStatus = useMemo(() => {
    const { draft, frozen } = status;

    if (isInactive) {
      return ProjectStatusLabelType.Suspended;
    }

    if (draft) {
      return ProjectStatusLabelType.Draft;
    }

    if (frozen) {
      return ProjectStatusLabelType.Frozen;
    }

    return ProjectStatusLabelType.Active;
  }, [status, isInactive]);

  return { projectStatus };
};

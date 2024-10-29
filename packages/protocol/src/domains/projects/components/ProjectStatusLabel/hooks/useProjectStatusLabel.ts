import { GetUserEndpointTokenStatusResponse } from 'multirpc-sdk';
import { useMemo } from 'react';

import { ProjectStatusLabelType } from 'domains/projects/const';
import { selectIsInactiveStatus } from 'domains/auth/store';
import { useAppSelector } from 'store/useAppSelector';

export interface IUseProjectStatusLabelProps {
  status: GetUserEndpointTokenStatusResponse;
  isDraft?: boolean;
}

export const useProjectStatusLabel = ({
  isDraft,
  status,
}: IUseProjectStatusLabelProps) => {
  const isInactive = useAppSelector(selectIsInactiveStatus);

  const projectStatusType = useMemo(() => {
    const { frozen } = status;

    if (isInactive) {
      return ProjectStatusLabelType.Suspended;
    }

    if (isDraft) {
      return ProjectStatusLabelType.Draft;
    }

    if (frozen) {
      return ProjectStatusLabelType.Frozen;
    }

    return ProjectStatusLabelType.Active;
  }, [isDraft, status, isInactive]);

  return { projectStatusType };
};

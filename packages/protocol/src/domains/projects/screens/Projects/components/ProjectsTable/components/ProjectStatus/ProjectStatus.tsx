import { Skeleton } from '@mui/material';
import { t } from '@ankr.com/common';

import { ProjectStatusLabel } from 'domains/projects/components/ProjectStatusLabel';
import { selectDraftUserEndpointToken } from 'domains/projects/store';
import { useAppSelector } from 'store/useAppSelector';
import { useJWTStatus } from 'domains/jwtToken/hooks/useJWTStatus';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export interface IProjectStatusProps {
  userEndpointToken: string;
}

export const ProjectStatus = ({ userEndpointToken }: IProjectStatusProps) => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();
  const draftUserEndpointToken = useAppSelector(selectDraftUserEndpointToken);
  const isDraft = userEndpointToken === draftUserEndpointToken;

  const {
    jwtStatus: projectStatus,
    loading: jwtStatusLoading,
    state: { isSuccess, isUninitialized },
  } = useJWTStatus({ group, userEndpointToken });

  if (jwtStatusLoading) {
    return <Skeleton width={70} height={22} variant="rounded" />;
  }

  const hasData = isSuccess && !isUninitialized && !jwtStatusLoading;

  if (!hasData) {
    return <>{t('common.no-data')}</>;
  }

  return <ProjectStatusLabel isDraft={isDraft} status={projectStatus} />;
};

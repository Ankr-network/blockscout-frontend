import { useMemo } from 'react';

import {
  DEFAULT_PROJECT_STATUS,
  Project,
  ProjectTable,
} from 'domains/projects/utils/getAllProjects';
import { useAppSelector } from 'store/useAppSelector';
import { selectDraftUserEndpointToken } from 'domains/projects/store';
import {
  selectProjectsStatsByRange,
  selectProjectsStatuses,
} from 'domains/projects/store/WhitelistsSelector';

import { useProjectsTableColumns } from './useProjectsTableColumns';

interface ProjectTableColumnsProps {
  projectsData: Project[];
  onProjectDialogOpen: () => void;
}

export const useProjectTable = ({
  projectsData,
  onProjectDialogOpen,
}: ProjectTableColumnsProps) => {
  const draftUserEndpointToken = useAppSelector(selectDraftUserEndpointToken);

  const statusData = useAppSelector(selectProjectsStatuses);
  const activityData = useAppSelector(selectProjectsStatsByRange);

  const { columns } = useProjectsTableColumns({
    onProjectDialogOpen,
  });

  const tableData: ProjectTable[] = useMemo(
    () =>
      projectsData.map(data => {
        const { userEndpointToken } = data;

        const currentStatusItem = statusData?.find(
          statusDataItem =>
            statusDataItem.userEndpointToken === userEndpointToken,
        );

        const status = currentStatusItem?.status || DEFAULT_PROJECT_STATUS;

        const projectStatus = {
          ...status,
          draft: draftUserEndpointToken === userEndpointToken,
        };

        const currentActivityData = activityData?.[userEndpointToken];
        const statsByRange = currentActivityData?.data ?? {};

        return {
          ...data,
          projectStatus,
          statsByRange,
        };
      }),

    [activityData, draftUserEndpointToken, projectsData, statusData],
  );

  return { columns, tableData };
};

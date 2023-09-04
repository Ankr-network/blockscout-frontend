import { useMemo } from 'react';

import {
  DEFAULT_PROJECT_STATUS,
  Project,
  ProjectTable,
} from 'domains/projects/utils/getAllProjects';
import { useAppSelector } from 'store/useAppSelector';
import { selectDraftTokenIndex } from 'domains/projects/store';
import {
  selectProjectsStatsByRange,
  selectProjectsStatuses,
} from 'domains/projects/store/WhitelistsSelector';

import { useColumns } from './useColumns';

interface ProjectTableColumnsProps {
  projectsData: Project[];
  onProjectDialogOpen: () => void;
}

export const useProjectTable = ({
  projectsData,
  onProjectDialogOpen,
}: ProjectTableColumnsProps) => {
  const draftTokenIndex = useAppSelector(selectDraftTokenIndex);
  const statusData = useAppSelector(selectProjectsStatuses);
  const activityData = useAppSelector(selectProjectsStatsByRange);

  const { columns } = useColumns({
    onProjectDialogOpen,
  });

  const tableData: ProjectTable[] = useMemo(
    () =>
      projectsData.map(data => {
        const { userEndpointToken, tokenIndex } = data;

        const currentStatusItem = statusData?.find(
          statusDataItem =>
            statusDataItem.userEndpointToken === userEndpointToken,
        );

        const status = currentStatusItem?.status || DEFAULT_PROJECT_STATUS;

        const projectStatus = {
          ...status,
          draft: draftTokenIndex === tokenIndex,
        };

        const currentActivityData = activityData?.[userEndpointToken];
        const statsByRange = currentActivityData?.data ?? {};

        return {
          ...data,
          projectStatus,
          statsByRange,
        };
      }),

    [activityData, draftTokenIndex, projectsData, statusData],
  );

  return { columns, tableData };
};

import { useEffect, useState } from 'react';

import { Project } from 'domains/projects/utils/getAllProjects';
import { useJwtTokenManager } from 'domains/jwtToken/hooks/useJwtTokenManager';
import { useLazyFetchStatsByRangeQuery } from 'domains/projects/actions/fetchStatsByRange';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import { useColumns } from './useColumns';

interface ProjectTableColumnsProps {
  projectData: Project[];
  onProjectDialogOpen: () => void;
}

export const useProjectTable = ({
  projectData,
  onProjectDialogOpen,
}: ProjectTableColumnsProps) => {
  const [fetchStatsByRangeQuery, { isLoading, data: statsData }] =
    useLazyFetchStatsByRangeQuery();
  const [tableData, setTableData] = useState(projectData);

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const { jwtTokens } = useJwtTokenManager();
  const { columns } = useColumns({
    isProjectsActivityLoading: isLoading,
    onProjectDialogOpen,
  });

  useEffect(() => {
    if (jwtTokens.length > 0) {
      fetchStatsByRangeQuery({ jwtTokens, group });
    }
  }, [fetchStatsByRangeQuery, group, jwtTokens]);

  useEffect(() => {
    const result = projectData.map(item => ({
      ...item,
      statsData: statsData?.[item.userEndpointToken],
    }));

    setTableData(result);
  }, [statsData, projectData]);

  return { columns, tableData };
};

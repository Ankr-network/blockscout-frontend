import { t } from '@ankr.com/common';

import { Project } from 'domains/projects/utils/getAllProjects';
import { Preloader } from 'uiKit/Preloader';
import { VirtualTable } from 'uiKit/VirtualTable';

import { useProjectsTable } from './hooks/useProjectsTable';
import { useProjectsTableStyles } from './useProjectsTableStyles';
import { useRedirectToProject } from './hooks/useRedirectToProject';

interface ProjectTableProps {
  data: Project[];
  isLoading: boolean;
  onProjectDialogOpen: () => void;
}

export const ProjectsTable = ({
  data,
  isLoading,
  onProjectDialogOpen,
}: ProjectTableProps) => {
  const { classes } = useProjectsTableStyles();

  const { columns, tableData } = useProjectsTable({
    projectsData: data,
    onProjectDialogOpen,
  });

  const onRowClick = useRedirectToProject();

  return (
    <VirtualTable
      classes={{
        container: classes.table,
        head: classes.head,
        rowContainer: classes.rowContainer,
        row: classes.row,
      }}
      initializing={isLoading}
      cols={columns}
      rows={tableData}
      emptyMessage={t('projects.list-project.no-data')}
      preloader={<Preloader className={classes.preloader} />}
      searchKey="name"
      onRowClick={onRowClick}
    />
  );
};

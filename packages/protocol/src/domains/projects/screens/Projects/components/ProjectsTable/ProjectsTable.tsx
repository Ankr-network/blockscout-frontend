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
  isFreePremium: boolean;
}

export const ProjectsTable = ({
  data,
  isLoading,
  onProjectDialogOpen,
  isFreePremium,
}: ProjectTableProps) => {
  const { cx, classes } = useProjectsTableStyles();

  const { columns, tableData } = useProjectsTable({
    projectsData: data,
    onProjectDialogOpen,
  });

  const onRowClick = useRedirectToProject(isFreePremium);

  return (
    <VirtualTable
      classes={{
        container: classes.table,
        head: classes.head,
        rowContainer: classes.rowContainer,
        row: cx(classes.row, { [classes.disabledRow]: isFreePremium }),
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

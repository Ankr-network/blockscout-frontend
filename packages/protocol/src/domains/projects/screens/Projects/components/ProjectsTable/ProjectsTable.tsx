import { t } from '@ankr.com/common';

import { Preloader } from 'uiKit/Preloader';
import { VirtualTable } from 'uiKit/VirtualTable';

import { useProjectsTable } from './hooks/useProjectsTable';
import { useProjectsTableStyles } from './useProjectsTableStyles';
import { useRedirectToProject } from './hooks/useRedirectToProject';

interface ProjectTableProps {
  onProjectDialogOpen: () => void;
}

export const ProjectsTable = ({ onProjectDialogOpen }: ProjectTableProps) => {
  const { classes } = useProjectsTableStyles();

  const { columns, initializing, rows } = useProjectsTable({
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
      cols={columns}
      emptyMessage={t('projects.list-project.no-data')}
      initializing={initializing}
      onRowClick={onRowClick}
      preloader={<Preloader className={classes.preloader} />}
      rows={rows}
      searchKey="name"
    />
  );
};

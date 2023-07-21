import { t } from '@ankr.com/common';

import { Project } from 'domains/projects/utils/getAllProjects';
import { Preloader } from 'uiKit/Preloader';
import { VirtualTable } from 'uiKit/VirtualTable';

import { useProjectTable } from './hooks/useProjectTable';
import { useProjectTableStyles } from './useProjectTableStyles';

interface ProjectTableProps {
  data: Project[];
  isLoading: boolean;
  searchContent: string;
}

export const ProjectTable = ({
  data,
  isLoading,
  searchContent,
}: ProjectTableProps) => {
  const { classes } = useProjectTableStyles();

  const { columns } = useProjectTable();

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
      rows={data}
      emptyMessage={t('common.no-data')}
      preloader={<Preloader className={classes.preloader} />}
      searchContent={searchContent}
      searchKey="name"
    />
  );
};

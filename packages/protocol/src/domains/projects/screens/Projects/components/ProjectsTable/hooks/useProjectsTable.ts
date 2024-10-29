import { useJWTsManager } from 'domains/jwtToken/hooks/useJWTsManager';

import { useProjectsTableColumns } from './useProjectsTableColumns';

interface ProjectTableColumnsProps {
  onProjectDialogOpen: () => void;
}

export const useProjectsTable = ({
  onProjectDialogOpen,
}: ProjectTableColumnsProps) => {
  const { jwts: rows, jwtsLoading: initializing } = useJWTsManager();

  const { columns } = useProjectsTableColumns({
    onProjectDialogOpen,
  });

  return { columns, initializing, rows };
};

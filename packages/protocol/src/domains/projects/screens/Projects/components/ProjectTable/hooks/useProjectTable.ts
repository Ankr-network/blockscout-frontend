import { useColumns } from './useColumns';

export const useProjectTable = () => {
  const { columns } = useColumns();

  return { columns };
};

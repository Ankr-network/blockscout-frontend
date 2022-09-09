import { useEffect, useState } from 'react';
import { ClientMapped } from '../../store/clientsSlice';
import { sortData } from './clientTableUtils';

export const useClientsTable = ({ rows }: { rows: ClientMapped[] }) => {
  const [sortBy, setSortBy] = useState<keyof ClientMapped>();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>();
  const [sortedData, setSortedData] = useState<ClientMapped[]>(rows);

  const handleOrder = (sortByValue: keyof ClientMapped) => {
    setSortBy(sortByValue);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  useEffect(() => {
    setSortedData(sortData(rows, sortBy, sortOrder));
  }, [rows, sortBy, sortOrder]);

  return {
    handleOrder,
    sortBy,
    sortOrder,
    sortedData,
  };
};

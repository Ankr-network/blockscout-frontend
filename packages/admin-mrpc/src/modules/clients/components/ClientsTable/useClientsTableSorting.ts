import { useEffect, useState } from 'react';
import { ClientMapped } from '../../store/clientsSlice';
import { sortData } from './clientTableUtils';

export const useClientsTableSorting = ({
  clients,
}: {
  clients: ClientMapped[];
}) => {
  const [sortBy, setSortBy] = useState<keyof ClientMapped>();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>();
  const [sortedData, setSortedData] = useState<ClientMapped[]>(clients);

  const handleOrder = (sortByValue: keyof ClientMapped) => {
    setSortBy(sortByValue);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  useEffect(() => {
    setSortedData(sortData(clients, sortBy, sortOrder));
  }, [clients, sortBy, sortOrder]);

  return {
    handleOrder,
    sortBy,
    sortOrder,
    sortedData,
  };
};

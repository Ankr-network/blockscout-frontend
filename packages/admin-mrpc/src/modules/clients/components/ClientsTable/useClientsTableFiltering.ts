import { ClientMapped } from '../../store/clientsSlice';
import { ClientType } from '../../types';
import { useEffect, useState } from 'react';

export const useClientsTableFiltering = ({
  clients,
}: {
  clients: ClientMapped[];
}) => {
  const [filteredData, setFilteredData] = useState<ClientMapped[]>(clients);
  const [filterClientType, setFilterClientType] =
    useState<ClientType | undefined>(undefined);
  const [filterKey, setFilterKey] =
    useState<keyof ClientMapped | undefined>(undefined);

  useEffect(() => {
    let filtered = clients;
    if (filterClientType !== undefined) {
      filtered = filtered.filter(i => i.clientType === filterClientType);
    }
    if (filterKey) {
      filtered = filtered.filter(i => Boolean(i[filterKey]));
    }
    setFilteredData(filtered);
  }, [clients, filterClientType, filterKey]);

  const handleFilterClientType = (clientType: ClientType) => {
    setFilterClientType(
      filterClientType === clientType ? undefined : clientType,
    );
  };

  const handleFilterKey = (key: keyof ClientMapped) => {
    setFilterKey(filterKey === key ? undefined : key);
  };

  return {
    filteredClients: filteredData,
    filterClientType,
    handleFilterClientType,
    handleFilterKey,
    filterKey,
  };
};

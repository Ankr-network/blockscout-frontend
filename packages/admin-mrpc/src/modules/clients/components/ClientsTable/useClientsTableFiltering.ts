import { useLocation } from 'react-router-dom';
import qs from 'query-string';

import { ClientMapped } from '../../store/clientsSlice';
import { ClientType } from '../../types';
import { useEffect, useState } from 'react';

export const useClientsTableFiltering = ({
  clients,
}: {
  clients: ClientMapped[];
}) => {
  const { search } = useLocation();
  const searchParams = qs.parse(search);
  const defaultFilterClients = Number(searchParams.clientType) || undefined;

  const [filteredData, setFilteredData] = useState<ClientMapped[]>(clients);
  const [filterClientType, setFilterClientType] =
    useState<ClientType | undefined>(defaultFilterClients);
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

  const handleFilterClientType = (clientType?: ClientType) => {
    if (typeof clientType === 'undefined') {
      setFilterClientType(undefined);
    } else {
      setFilterClientType(clientType);
    }
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

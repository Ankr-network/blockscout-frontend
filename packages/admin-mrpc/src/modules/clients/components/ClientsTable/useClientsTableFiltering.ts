import { useLocation } from 'react-router-dom';
import qs from 'query-string';

import { ClientMapped } from '../../store/clientsSlice';
import { ClientType } from '../../types';
import { useCallback, useEffect, useState } from 'react';

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
  const [filterKeys, setFilterKeys] = useState<(keyof ClientMapped)[]>([]);

  useEffect(() => {
    let filtered = clients;
    if (filterClientType !== undefined) {
      filtered = filtered.filter(i => i.clientType === filterClientType);
    }
    if (filterKeys.length > 0) {
      filtered = filtered.filter(i =>
        filterKeys.every(item => Boolean(i[item])),
      );
    }
    setFilteredData(filtered);
  }, [clients, filterClientType, filterKeys]);

  const handleFilterClientType = useCallback((clientType?: ClientType) => {
    if (typeof clientType === 'undefined') {
      setFilterClientType(undefined);
    } else {
      setFilterClientType(clientType);
    }
  }, []);

  const handleFilterKey = useCallback(
    (key?: keyof ClientMapped) => {
      if (!key) {
        return setFilterKeys([]);
      }
      if (filterKeys.includes(key)) {
        return setFilterKeys(filterKeys.filter(i => i !== key));
      }
      return setFilterKeys([...filterKeys, key]);
    },
    [filterKeys],
  );

  return {
    filteredClients: filteredData,
    filterClientType,
    handleFilterClientType,
    handleFilterKey,
    filterKeys,
  };
};

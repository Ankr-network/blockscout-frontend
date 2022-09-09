import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Web3Address } from 'multirpc-sdk';
import { ClientsRoutesConfig } from '../../ClientsRoutes';
import { useFetchCountersQuery } from '../../actions/fetchCounters';
import { ClientMapped } from '../../store/clientsSlice';

export const useSearchClientsInput = () => {
  const history = useHistory();
  const { data, isLoading } = useFetchCountersQuery();
  const [searchValue, setSearchValue] = useState('');
  const [foundClients, setFoundClients] = useState<ClientMapped[]>([]);

  useEffect(() => {
    const clients = data?.counters || [];
    const clientsFiltered = clients.filter(
      c => c.email?.includes(searchValue) || c.address?.includes(searchValue),
    );
    setFoundClients(clientsFiltered);
  }, [data, searchValue]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSearchValue(e.target.value);
  };

  const onClientClick = (address?: Web3Address) => {
    if (!address) {
      return;
    }
    history.push({
      pathname: ClientsRoutesConfig.clientInfo.generatePath(address),
    });
    setSearchValue('');
  };

  return {
    isLoading,
    searchValue,
    foundClients,
    onClientClick,
    onChange,
  };
};

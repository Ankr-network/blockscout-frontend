import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Web3Address } from 'multirpc-sdk';
import { ClientsRoutesConfig } from 'modules/clients/ClientsRoutesConfig';
import { ClientMapped } from 'modules/clients/store/clientsSlice';
import { clearSpaces } from 'modules/clients/utils/clearSpaces';
import { useLazyFetchClients } from 'modules/clients/hooks/useLazyFetchClients';

export const useSearchClientsInput = () => {
  const history = useHistory();
  const { data, isLoading } = useLazyFetchClients();
  const [searchValue, setSearchValue] = useState('');
  const [foundClients, setFoundClients] = useState<ClientMapped[]>([]);

  useEffect(() => {
    const clients = data?.counters || [];
    const clientsFiltered = clients.filter(
      client =>
        client.email?.includes(searchValue) ||
        client.address?.includes(searchValue) ||
        client.user?.includes(searchValue),
    );
    setFoundClients(clientsFiltered);
  }, [data, searchValue]);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newValueNormalized = clearSpaces(e.target.value.toLowerCase());

      setSearchValue(newValueNormalized);
    },
    [],
  );

  const onClientClick = useCallback(
    (address?: Web3Address) => {
      if (!address) {
        return;
      }
      history.push({
        pathname: ClientsRoutesConfig.clientInfo.generatePath(address),
      });
      setSearchValue('');
    },
    [history],
  );

  return {
    isLoading,
    searchValue,
    foundClients,
    onClientClick,
    onChange,
  };
};

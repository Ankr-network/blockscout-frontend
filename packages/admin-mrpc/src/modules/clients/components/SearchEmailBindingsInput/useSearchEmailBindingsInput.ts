import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Web3Address } from 'multirpc-sdk';
import { ClientsRoutesConfig } from 'modules/clients/ClientsRoutesConfig';
import { clearSpaces } from 'modules/clients/utils/clearSpaces';
import { useLazyFetchUsersEmailsQuery } from '../../actions/fetchUsersEmails';

export const useSearchEmailBindingsInput = (
  filterType: 'email' | 'address',
) => {
  const history = useHistory();

  const [searchValue, setSearchValue] = useState('');
  const [
    fetchClients,
    {
      data: foundClients = [],
      isLoading: isRequestLoading,
      isFetching: isRequestFetching,
    },
  ] = useLazyFetchUsersEmailsQuery();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadingState = isRequestLoading || isRequestFetching;
    setIsLoading(loadingState);
  }, [isRequestLoading, isRequestFetching]);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newValueNormalized = clearSpaces(e.target.value.toLowerCase());

      setSearchValue(newValueNormalized);
    },
    [],
  );

  useEffect(() => {
    if (searchValue) {
      setIsLoading(true);
      // searching with timeout to have an offset for typing
      setTimeout(
        () => fetchClients({ filter: searchValue, filter_type: filterType }),
        1000,
      );
    }
  }, [fetchClients, filterType, searchValue]);

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

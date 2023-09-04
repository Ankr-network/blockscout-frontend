import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Web3Address } from 'multirpc-sdk';
import debounce from 'lodash.debounce';
import { Milliseconds } from '@ankr.com/utils';
import { utils } from 'ethers';

import { ClientsRoutesConfig } from 'modules/clients/ClientsRoutesConfig';
import { clearSpaces } from 'modules/clients/utils/clearSpaces';

import { useLazyFetchUsersEmailsQuery } from '../../actions/fetchUsersEmails';
import { useLazyFetchUserByTokenQuery } from '../../actions/fetchUserByToken';

export type FilterType = 'email' | 'address' | 'token';

export const MIN_SEARCH_VALUE_LENGTH = 2;

const SEARCH_DELAY: Milliseconds = 500;

export const useSearchEmailBindingsInput = (filterType: FilterType) => {
  const history = useHistory();

  const [
    fetchClientsByEmail,
    {
      data: foundClientsByEmail = [],
      isLoading: isRequestByEmailLoading,
      isFetching: isRequestByEmailFetching,
    },
  ] = useLazyFetchUsersEmailsQuery();
  const [
    fetchClientsByToken,
    {
      data: foundClientsByToken = [],
      isLoading: isRequestByTokenLoading,
      isFetching: isRequestByTokenFetching,
    },
  ] = useLazyFetchUserByTokenQuery();

  const [error, setError] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const foundClients = useMemo(() => {
    if (filterType === 'token') {
      return foundClientsByToken;
    }

    return foundClientsByEmail;
  }, [filterType, foundClientsByToken, foundClientsByEmail]);

  useEffect(() => {
    setIsLoading(
      isRequestByEmailLoading ||
        isRequestByEmailFetching ||
        isRequestByTokenLoading ||
        isRequestByTokenFetching,
    );
  }, [
    isRequestByEmailLoading,
    isRequestByEmailFetching,
    isRequestByTokenLoading,
    isRequestByTokenFetching,
  ]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearch = useCallback(
    debounce(value => {
      if (value) {
        if (value.length >= MIN_SEARCH_VALUE_LENGTH) {
          if (filterType === 'token') {
            if (value.length !== 64 || !value.match(/^[0-9A-Fa-f]+$/)) {
              setError('Invalid Token');

              return;
            }

            setError('');
            fetchClientsByToken({ token: value });

            return;
          }

          if (filterType === 'address') {
            if (!utils.isAddress(value)) {
              setError('Invalid ETH Address');

              return;
            }

            setError('');
          }

          fetchClientsByEmail({ filter: value, filter_type: filterType });
        }
      } else {
        setError('');
      }
    }, SEARCH_DELAY),
    [fetchClientsByEmail, fetchClientsByToken, filterType],
  );

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setIsLoading(true);

      const newValueNormalized = clearSpaces(e.target.value.toLowerCase());

      handleSearch(newValueNormalized);
      setSearchValue(newValueNormalized);
    },
    [handleSearch],
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
    error,
    isLoading,
    searchValue,
    setSearchValue,
    foundClients,
    onClientClick,
    onChange,
  };
};

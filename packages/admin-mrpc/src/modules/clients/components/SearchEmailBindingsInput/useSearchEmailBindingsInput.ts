/* eslint-disable max-lines-per-function */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Web3Address } from 'multirpc-sdk';
import debounce from 'lodash.debounce';
import { Milliseconds } from '@ankr.com/utils';
import { utils } from 'ethers';
import { skipToken } from '@reduxjs/toolkit/dist/query';

import { ClientsRoutesConfig } from 'modules/clients/ClientsRoutesConfig';
import { clearSpaces } from 'modules/clients/utils/clearSpaces';
import { useLazyFetchUsersEmailsQuery } from 'modules/clients/actions/fetchUsersEmails';
import { useLazyFetchUserByTokenQuery } from 'modules/clients/actions/fetchUserByToken';
import { useLazyFetchAddressBindingsQuery } from 'modules/clients/actions/fetchAddressBindings';
import { useFetchBalancesQuery } from 'modules/clients/actions/fetchBalances';

export type FilterType = 'email' | 'address' | 'token';

export const MIN_SEARCH_VALUE_LENGTH = 2;

const SEARCH_DELAY: Milliseconds = 500;

export interface IClientBindingsResult {
  address: Web3Address;
  email?: string;
}

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
    fetchAddressBindings,
    {
      data: addressBindings = [],
      isLoading: isRequestByAddressLoading,
      isFetching: isRequestByAddressFetching,
    },
  ] = useLazyFetchAddressBindingsQuery();
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

  const {
    data: currentClientBalance,
    isLoading: isRequestBalancesLoading,
    isFetching: isRequestBalancesFetching,
    refetch: refetchClientBalance,
  } = useFetchBalancesQuery(
    searchValue && !error ? { address: searchValue } : skipToken,
  );

  const foundClients = useMemo(() => {
    if (filterType === 'token') {
      return foundClientsByToken.map(client => ({
        address: client.address,
        email: client.email,
      }));
    }

    if (filterType === 'email') {
      return foundClientsByEmail.map(client => ({
        address: client.address,
        email: client.email,
      }));
    }

    const doesClientExist =
      !!currentClientBalance?.amount ||
      !!currentClientBalance?.amountAnkr ||
      !!currentClientBalance?.creditAnkrAmount ||
      !!currentClientBalance?.creditUsdAmount ||
      !!currentClientBalance?.creditVoucherAmount ||
      !!addressBindings.length ||
      !!foundClientsByEmail.length;

    if (doesClientExist) {
      return !foundClientsByEmail.length
        ? [
            {
              address: searchValue,
              email: undefined,
            } as IClientBindingsResult,
          ]
        : foundClientsByEmail.map(client => ({
            address: client.address,
            email: client.email,
          }));
    }

    return [];
  }, [
    filterType,
    searchValue,
    addressBindings,
    foundClientsByToken,
    foundClientsByEmail,
    currentClientBalance,
  ]);

  useEffect(() => {
    setIsLoading(
      isRequestByEmailLoading ||
        isRequestByEmailFetching ||
        isRequestByTokenLoading ||
        isRequestByTokenFetching ||
        isRequestByAddressLoading ||
        isRequestByAddressFetching ||
        isRequestBalancesLoading ||
        isRequestBalancesFetching,
    );
  }, [
    isRequestByEmailLoading,
    isRequestByEmailFetching,
    isRequestByTokenLoading,
    isRequestByTokenFetching,
    isRequestByAddressLoading,
    isRequestByAddressFetching,
    isRequestBalancesLoading,
    isRequestBalancesFetching,
  ]);

  const handleSearch = useMemo(
    () =>
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
              fetchAddressBindings({ address: value });
            }

            fetchClientsByEmail({ filter: value, filter_type: filterType });
            refetchClientBalance();
          }
        } else {
          setError('');
        }
      }, SEARCH_DELAY),
    [
      fetchClientsByEmail,
      fetchClientsByToken,
      fetchAddressBindings,
      refetchClientBalance,
      filterType,
    ],
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

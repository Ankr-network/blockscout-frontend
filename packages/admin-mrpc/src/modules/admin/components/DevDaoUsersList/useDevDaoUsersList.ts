import { useCallback, useMemo } from 'react';
import { GetUsersRegistrationsRequest } from 'multirpc-sdk';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { useFetchCountersQuery } from 'modules/clients/actions/fetchCounters';
import { useLazyGetUsersRegistrationsQuery } from '../../actions/getUsersRegistrations';
import { useFilters } from '../../hooks/useFilters';
import { useDatesRange } from '../../hooks/useDatesRange';
import { formatDateParamToSeconds } from '../../utils/formatDateParamToSeconds';

export const useDevDaoUsersList = () => {
  const {
    data: clients,
    isLoading: isLoadingClients,
    isFetching: isFetchingClients,
  } = useFetchCountersQuery();

  const [
    handleGetUsersRegistrations,
    {
      data: addresses,
      isLoading: isLoadingRegistrations,
      isFetching: isFetchingRegistrations,
    },
  ] = useLazyGetUsersRegistrationsQuery();

  useSetBreadcrumbs([
    {
      title: '',
    },
  ]);

  const { filter, handleSelectFilter } = useFilters();
  const { dateFrom, dateTo, onChangeFrom, onChangeTo } = useDatesRange();

  const requestClients = useCallback(() => {
    if (!dateFrom || !dateTo) return;

    const requestParams: GetUsersRegistrationsRequest = {
      from: formatDateParamToSeconds(dateFrom),
      to: formatDateParamToSeconds(dateTo),
      filter,
    };

    handleGetUsersRegistrations(requestParams);
  }, [dateFrom, dateTo, filter, handleGetUsersRegistrations]);

  const clientsDevDao = useMemo(() => {
    if (
      !clients?.counters ||
      !addresses ||
      isLoadingClients ||
      isFetchingClients
    ) {
      return [];
    }

    return clients.counters.filter(({ address }) => {
      if (!address) return false;

      return addresses.includes(address.toLowerCase());
    });
  }, [addresses, clients?.counters, isFetchingClients, isLoadingClients]);

  return {
    dateFrom,
    onChangeFrom,
    dateTo,
    onChangeTo,
    requestClients,
    isLoading:
      isLoadingRegistrations ||
      isFetchingRegistrations ||
      isLoadingClients ||
      isFetchingClients,
    clientsDevDao,
    filter,
    handleSelectFilter,
  };
};

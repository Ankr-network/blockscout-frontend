import { useCallback, useMemo } from 'react';
import { GetUsersRegistrationsRequest } from 'multirpc-sdk';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { useLazyGetUsersRegistrationsQuery } from 'modules/admin/actions/getUsersRegistrations';
import { useFilters } from 'modules/admin/hooks/useFilters';
import { useDatesRange } from 'modules/admin/hooks/useDatesRange';
import { formatDateParamToSeconds } from 'modules/admin/utils/formatDateParamToSeconds';
import { useLazyFetchClients } from 'modules/clients/hooks/useLazyFetchClients';

export const useDevDaoUsersList = () => {
  const {
    data: clients,
    isLoading: isLoadingClients,
    isFetching: isFetchingClients,
  } = useLazyFetchClients();

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

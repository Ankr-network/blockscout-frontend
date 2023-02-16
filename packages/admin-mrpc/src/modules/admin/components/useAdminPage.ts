import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { addDays, format, millisecondsToSeconds, parseISO } from 'date-fns';
import { SelectChangeEvent } from '@mui/material';
import {
  GetUsersRegistrationsFilter,
  GetUsersRegistrationsRequest,
} from 'multirpc-sdk';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { useFetchCountersQuery } from 'modules/clients/actions/fetchCounters';
import { useLazyGetUsersRegistrationsQuery } from '../actions/getUsersRegistrations';

const filters: { value: GetUsersRegistrationsFilter; label: string }[] = [
  {
    value: 'devdao',
    label: 'DevDao',
  },
  {
    value: '',
    label: 'All',
  },
];

const formatDateToIsoString = (date: Date) => {
  return format(date, "yyyy-MM-dd'T'HH:mm");
};

const formatDateParamToSeconds = (date: string) => {
  return Math.floor(millisecondsToSeconds(parseISO(date).getTime()));
};

const MAX_RANGE_DAYS = 31;

export const useAdminPage = () => {
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

  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');

  useEffect(() => {
    const dateNow = new Date();
    const dateYesterday = addDays(dateNow, -MAX_RANGE_DAYS);
    const dateNowIsoString = formatDateToIsoString(dateNow);
    const dateYesterdayIsoString = formatDateToIsoString(dateYesterday);

    setDateFrom(dateYesterdayIsoString);
    setDateTo(dateNowIsoString);
  }, []);

  const [filter, setFilter] =
    React.useState<GetUsersRegistrationsFilter>('devdao');

  const handleSelectFilter = (event: SelectChangeEvent) => {
    setFilter(event.target.value as GetUsersRegistrationsFilter);
  };

  const onChangeFrom = (event: ChangeEvent<HTMLInputElement>) => {
    setDateFrom(event.target.value);
  };

  const onChangeTo = (event: ChangeEvent<HTMLInputElement>) => {
    setDateTo(event.target.value);
  };

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
    filters,
    filter,
    handleSelectFilter,
  };
};

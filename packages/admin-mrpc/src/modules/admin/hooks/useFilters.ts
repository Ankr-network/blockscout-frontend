import { GetUsersRegistrationsFilter } from 'multirpc-sdk';
import React from 'react';
import { SelectChangeEvent } from '@mui/material';
import { filters } from '../const';

export const useFilters = () => {
  const [filter, setFilter] = React.useState<GetUsersRegistrationsFilter>(
    filters[0].value,
  );

  const handleSelectFilter = (event: SelectChangeEvent) => {
    setFilter(event.target.value as GetUsersRegistrationsFilter);
  };

  return {
    filter,
    handleSelectFilter,
  };
};

import { useQuery } from '@redux-requests/react';

import { fetchUnstakeEndDate } from '../actions/fetchUnstakeEndDate';

export const useFetchUnstakeEndDate = (): Date => {
  const { data: endDate } = useQuery({
    action: fetchUnstakeEndDate,
    defaultData: null,
    type: fetchUnstakeEndDate,
  });

  return endDate === null ? new Date() : endDate;
};

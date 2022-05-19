import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useEffect } from 'react';

import {
  getUSDequiwalent,
  IFetchUSDResponseData,
} from 'modules/stake/actions/getUSDequiwalent';

interface IUseStakeStatsData {
  data: IFetchUSDResponseData | null;
  isLoading: boolean;
}

// todo: write test for it

export const useStakeStats = (): IUseStakeStatsData => {
  const dispatchRequest = useDispatchRequest();

  const { data, loading: isLoading } = useQuery({
    type: getUSDequiwalent,
  });

  useEffect(() => {
    dispatchRequest(getUSDequiwalent());
  }, [dispatchRequest]);

  return {
    data,
    isLoading,
  };
};

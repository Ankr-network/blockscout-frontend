import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import BigNumber from 'bignumber.js';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { useLazyGetStakeDataQuery } from 'modules/stake-xdc/actions/getStakeData';

interface IUseStakeFormData {
  getStakeDataError?: FetchBaseQueryError | SerializedError;
  isStakeDataError: boolean;
  isStakeDataLoading: boolean;
  xdcBalance: BigNumber;
}

export const useStakeForm = (): IUseStakeFormData => {
  const [
    getStakeData,
    {
      data: stakeData,
      error: stakeDataError,
      isError: isStakeDataError,
      isFetching: isStakeDataLoading,
    },
  ] = useLazyGetStakeDataQuery();

  const xdcBalance = stakeData?.xdcBalance ?? ZERO;

  useProviderEffect(() => {
    getStakeData();
  }, []);

  return {
    getStakeDataError: stakeDataError,
    isStakeDataError,
    isStakeDataLoading,
    xdcBalance,
  };
};

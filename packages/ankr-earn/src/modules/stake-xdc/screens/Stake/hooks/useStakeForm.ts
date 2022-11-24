import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import BigNumber from 'bignumber.js';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { useLazyGetStakeDataQuery } from 'modules/stake-xdc/actions/getStakeData';

interface IUseStakeFormData {
  aXDCcBalance: BigNumber;
  aXDCcRatio: BigNumber;
  getStakeDataError?: FetchBaseQueryError | SerializedError;
  isStakeDataError: boolean;
  isStakeDataLoading: boolean;
  minAmount: BigNumber;
  xdcBalance: BigNumber;
  xdcPoolAmount: BigNumber;
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

  const aXDCcBalance = stakeData?.aXDCcBalance ?? ZERO;
  const aXDCcRatio = stakeData?.aXDCcRatio ?? ZERO;
  const minAmount = stakeData?.minStakeAmount ?? ZERO;
  const xdcBalance = stakeData?.xdcBalance ?? ZERO;
  const xdcPoolAmount = stakeData?.xdcPoolAmount ?? ZERO;

  useProviderEffect(() => {
    getStakeData();
  }, []);

  return {
    aXDCcBalance,
    aXDCcRatio,
    getStakeDataError: stakeDataError,
    isStakeDataError,
    isStakeDataLoading,
    minAmount,
    xdcBalance,
    xdcPoolAmount,
  };
};

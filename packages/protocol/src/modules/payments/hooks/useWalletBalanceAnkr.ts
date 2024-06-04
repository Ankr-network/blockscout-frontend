import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  selectWalletBalanceAnkr,
  selectWalletBalanceAnkrLoading,
  useFetchWalletBalanceAnkrQuery,
  useLazyFetchWalletBalanceAnkrQuery,
} from '../actions/fetchWalletBalanceAnkr';

export interface IUseWalletBalanceAnkrProps extends IUseQueryProps {}

export const useWalletBalanceAnkr = ({
  skipFetching,
}: IUseWalletBalanceAnkrProps | void = {}) => {
  const { refetch: handleRefetchWalletBalanceAnkr } =
    useFetchWalletBalanceAnkrQuery(
      getQueryParams({ params: undefined, skipFetching }),
    );

  const [handleFetchWalletBalanceAnkr] = useLazyFetchWalletBalanceAnkrQuery();

  const balanceAnkr = useAppSelector(selectWalletBalanceAnkr);
  const isLoading = useAppSelector(selectWalletBalanceAnkrLoading);

  return {
    balanceAnkr,
    handleFetchWalletBalanceAnkr,
    handleRefetchWalletBalanceAnkr,
    isLoading,
  };
};

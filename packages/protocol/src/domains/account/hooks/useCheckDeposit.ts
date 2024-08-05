import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  selectIsDepositMade,
  selectIsDepositMadeLoading,
  useCheckDepositQuery,
  useLazyCheckDepositQuery,
} from '../actions/checkDeposit';

export interface IUseCheckDeposit extends IUseQueryProps {}

export const useCheckDeposit = ({
  skipFetching = false,
}: IUseCheckDeposit = {}) => {
  useCheckDepositQuery(getQueryParams({ params: undefined, skipFetching }));

  const [handleCheckDeposit] = useLazyCheckDepositQuery();

  const isDepositMade = useAppSelector(selectIsDepositMade);

  const isLoading = useAppSelector(selectIsDepositMadeLoading);

  return { handleCheckDeposit, isDepositMade, isLoading };
};

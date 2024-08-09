import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  selectIsPAYGDepositMade,
  selectIsPAYGDepositMadeLoading,
  useCheckPAYGDepositQuery,
  useLazyCheckPAYGDepositQuery,
} from '../actions/checkPAYGDeposit';

export interface IUseCheckDeposit extends IUseQueryProps {}

export const useCheckDeposit = ({
  skipFetching = false,
}: IUseCheckDeposit = {}) => {
  useCheckPAYGDepositQuery(getQueryParams({ params: undefined, skipFetching }));

  const [handleCheckPAYGDeposit] = useLazyCheckPAYGDepositQuery();

  const isPAYGDepositMade = useAppSelector(selectIsPAYGDepositMade);

  const isLoading = useAppSelector(selectIsPAYGDepositMadeLoading);

  return { handleCheckPAYGDeposit, isPAYGDepositMade, isLoading };
};

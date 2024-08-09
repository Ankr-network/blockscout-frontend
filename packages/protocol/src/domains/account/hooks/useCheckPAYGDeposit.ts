import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  ICheckPAYGDepositParams,
  selectIsPAYGDepositMade,
  selectIsPAYGDepositMadeLoading,
  useCheckPAYGDepositQuery,
  useLazyCheckPAYGDepositQuery,
} from '../actions/checkPAYGDeposit';

export interface IUseCheckPAYGDeposit
  extends ICheckPAYGDepositParams,
    IUseQueryProps {}

export const useCheckPAYGDeposit = ({
  skipFetching = false,
  ...params
}: IUseCheckPAYGDeposit) => {
  useCheckPAYGDepositQuery(getQueryParams({ params, skipFetching }));

  const [handleCheckPAYGDeposit] = useLazyCheckPAYGDepositQuery();

  const isPAYGDepositMade = useAppSelector(state =>
    selectIsPAYGDepositMade(state, params),
  );

  const isLoading = useAppSelector(state =>
    selectIsPAYGDepositMadeLoading(state, params),
  );

  return { handleCheckPAYGDeposit, isPAYGDepositMade, isLoading };
};

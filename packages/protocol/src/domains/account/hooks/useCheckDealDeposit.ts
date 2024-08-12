import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  ICheckDealDepositParams,
  selectIsDealDepositMade,
  selectIsDealDepositMadeLoading,
  useCheckDealDepositQuery,
  useLazyCheckDealDepositQuery,
} from '../actions/checkDealDeposit';

export interface IUseCheckPAYGDeposit
  extends ICheckDealDepositParams,
    IUseQueryProps {}

export const useCheckDealDeposit = ({
  pollingInterval,
  skipFetching = false,
  ...params
}: IUseCheckPAYGDeposit) => {
  useCheckDealDepositQuery(getQueryParams({ params, skipFetching }), {
    pollingInterval,
  });

  const [handleCheckDealDeposit] = useLazyCheckDealDepositQuery();

  const isDealDepositMade = useAppSelector(state =>
    selectIsDealDepositMade(state, params),
  );

  const isLoading = useAppSelector(state =>
    selectIsDealDepositMadeLoading(state, params),
  );

  return { handleCheckDealDeposit, isDealDepositMade, isLoading };
};

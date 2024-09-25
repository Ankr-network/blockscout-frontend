import { useMemo } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

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
  pollingInterval,
  skipFetching = false,
  ...rest
}: IUseCheckPAYGDeposit) => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const params = useMemo(() => ({ ...rest, group }), [group, rest])

  useCheckPAYGDepositQuery(getQueryParams({ params, skipFetching }), {
    pollingInterval,
  });

  const [handleCheckPAYGDeposit] = useLazyCheckPAYGDepositQuery();

  const isPAYGDepositMade = useAppSelector(state =>
    selectIsPAYGDepositMade(state, params),
  );

  const isLoading = useAppSelector(state =>
    selectIsPAYGDepositMadeLoading(state, params),
  );

  return { handleCheckPAYGDeposit, isPAYGDepositMade, isLoading };
};

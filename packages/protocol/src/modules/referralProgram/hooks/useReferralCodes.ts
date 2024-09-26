import { useCallback, useMemo } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';
import { useAutoupdatedRef } from 'modules/common/hooks/useAutoupdatedRef';

import {
  IFetchReferralCodesParams,
  selectReferralCodes,
  selectReferralCodesLoading,
  selectReferralCodesState,
  useFetchReferralCodesQuery,
  useLazyFetchReferralCodesQuery,
} from '../actions/fetchReferralCodes';

export interface IUseReferralCodesProps
  extends IUseQueryProps,
    IFetchReferralCodesParams {}

export const useReferralCodes = ({
  group,
  skipFetching = false,
}: IUseReferralCodesProps = {}) => {
  const params = useMemo((): IFetchReferralCodesParams => ({ group }), [group]);

  useFetchReferralCodesQuery(getQueryParams({ params, skipFetching }));

  const [fetchLazy] = useLazyFetchReferralCodesQuery();

  const handleFetchReferralCodes = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const handleFetchReferralCodesRef = useAutoupdatedRef(
    handleFetchReferralCodes,
  );

  const referralCodes = useAppSelector(state =>
    selectReferralCodes(state, params),
  );

  const loading = useAppSelector(state =>
    selectReferralCodesLoading(state, params),
  );

  const referralCodesState = useAppSelector(state =>
    selectReferralCodesState(state, params),
  );

  const loaded = referralCodesState.data !== undefined;

  return {
    handleFetchReferralCodes,
    handleFetchReferralCodesRef,
    loaded,
    loading,
    referralCodes,
  };
};

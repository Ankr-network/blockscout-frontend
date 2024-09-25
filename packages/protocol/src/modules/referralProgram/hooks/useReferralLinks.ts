import { useCallback, useMemo } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';
import { useAutoupdatedRef } from 'modules/common/hooks/useAutoupdatedRef';

import {
  IFetchReferralLinksByCodesParams,
  selectReferralLinks,
  selectReferralLinksLoading,
  useFetchReferralLinksByCodesQuery,
  useLazyFetchReferralLinksByCodesQuery,
} from '../actions/fetchReferralLinksByCodes';

export interface IUseReferralLinksProps
  extends IUseQueryProps,
    IFetchReferralLinksByCodesParams {}

export const useReferralLinks = ({
  codes,
  group,
  skipFetching = false,
}: IUseReferralLinksProps) => {
  const params = useMemo(
    (): IFetchReferralLinksByCodesParams => ({ codes, group }),
    [codes, group],
  );

  useFetchReferralLinksByCodesQuery(getQueryParams({ params, skipFetching }));

  const [fetchLazy] = useLazyFetchReferralLinksByCodesQuery();

  const handleFetchReferralLinks = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const handleFetchReferralLinksRef = useAutoupdatedRef(
    handleFetchReferralLinks,
  );

  const referralLinks = useAppSelector(state =>
    selectReferralLinks(state, params),
  );

  const loading = useAppSelector(state =>
    selectReferralLinksLoading(state, params),
  );

  return {
    handleFetchReferralLinks,
    handleFetchReferralLinksRef,
    loading,
    referralLinks,
  };
};

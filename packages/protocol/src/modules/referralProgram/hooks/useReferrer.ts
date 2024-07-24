import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  selectReferrer,
  selectReferrerLoading,
  useFetchReferrerQuery,
  useLazyFetchReferrerQuery,
} from '../actions/fetchReferrer';

export interface IUseReferrerProps extends IUseQueryProps {}

export const useReferrer = ({
  skipFetching = false,
}: IUseReferrerProps | void = {}) => {
  useFetchReferrerQuery(getQueryParams({ params: undefined, skipFetching }));

  const [handleFetchReferrer] = useLazyFetchReferrerQuery();

  const referrer = useAppSelector(selectReferrer);

  const isLoading = useAppSelector(selectReferrerLoading);

  return { handleFetchReferrer, isLoading, referrer };
};

import { useCallback, useMemo } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  IFetchJWTStatusParams,
  selectJWTStatus,
  selectJWTStatusLoading,
  selectJWTStatusState,
  useFetchJWTStatusQuery,
  useLazyFetchJWTStatusQuery,
} from '../action/fetchJWTStatus';

export interface IUseJWTStatusProps
  extends IFetchJWTStatusParams,
    IUseQueryProps {}

export const useJWTStatus = ({
  group,
  skipFetching,
  userEndpointToken,
}: IUseJWTStatusProps) => {
  const params = useMemo(
    (): IFetchJWTStatusParams => ({ group, userEndpointToken }),
    [group, userEndpointToken],
  );

  useFetchJWTStatusQuery(getQueryParams({ params, skipFetching }));

  const [fetchLazy] = useLazyFetchJWTStatusQuery();

  const handleFetchJWTStatus = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const jwtStatus = useAppSelector(state => selectJWTStatus(state, params));
  const loading = useAppSelector(state =>
    selectJWTStatusLoading(state, params),
  );
  const jwtStatusState = useAppSelector(state =>
    selectJWTStatusState(state, params),
  );

  return { handleFetchJWTStatus, loading, jwtStatus, state: jwtStatusState };
};

import { resetRequests } from '@redux-requests/core';
import { useQuery } from '@redux-requests/react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchNearRequest } from 'domains/requestComposer/actions/near/fetchNearRequest';
import { NearMethod } from 'domains/requestComposer/constants/near';
import {
  resetEVMMethod,
  selectEVMMethod,
} from 'domains/requestComposer/store/requestComposerSlice';
import { NearMethodResponse } from 'domains/requestComposer/types/near';
import { useOnUnmount } from 'modules/common/hooks/useOnUnmount';
import { ComposerRequest } from '../../hooks/useRequestComposerLogs';

export const useNearRequest = (): ComposerRequest<
  NearMethod,
  NearMethodResponse
> => {
  const {
    data: { response, error, time },
    loading,
    pristine,
  } = useQuery({ defaultData: { time: 0 }, type: fetchNearRequest });

  const method = useSelector(selectEVMMethod) as [NearMethod] | undefined;

  const dispatch = useDispatch();

  useOnUnmount(() => {
    dispatch(resetEVMMethod());
    dispatch(resetRequests([fetchNearRequest.toString()]));
  });

  return {
    error,
    method,
    response,
    time,
    withResponse: !loading && !pristine && !error,
  };
};

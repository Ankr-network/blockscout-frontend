import { resetRequests } from '@redux-requests/core';
import { useQuery } from '@redux-requests/react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTronChainRequest } from 'domains/requestComposer/actions/tron/fetchTronChainRequest';
import {
  resetEVMMethod,
  selectEVMMethod,
} from 'domains/requestComposer/store/requestComposerSlice';
import { useOnUnmount } from 'modules/common/hooks/useOnUnmount';
import { ComposerRequest } from '../../hooks/useRequestComposerLogs';
import { TronChainMethod } from 'domains/requestComposer/constants/tron';
import { TronChainMethodResponse } from 'domains/requestComposer/types/tron';

export const useTronChainRequest = (): ComposerRequest<
  TronChainMethod,
  TronChainMethodResponse
> => {
  const {
    data: { response, error, time },
    loading,
    pristine,
  } = useQuery({
    defaultData: { time: 0 },
    type: fetchTronChainRequest,
  });

  const method = useSelector(selectEVMMethod) as [TronChainMethod] | undefined;

  const dispatch = useDispatch();

  useOnUnmount(() => {
    dispatch(resetEVMMethod());
    dispatch(resetRequests([fetchTronChainRequest.toString()]));
  });

  return {
    error,
    method,
    response,
    time,
    withResponse: !loading && !pristine && !error,
  };
};

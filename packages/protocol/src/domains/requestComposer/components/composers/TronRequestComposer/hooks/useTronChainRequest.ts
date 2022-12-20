import { useDispatch, useSelector } from 'react-redux';

import { ComposerRequest } from 'domains/requestComposer/hooks/useRequestComposerLogs';
import { FetchTronChainRequestResult } from 'domains/requestComposer/actions/tron/types';
import { TronChainMethod } from 'domains/requestComposer/constants/tron';
import { TronChainMethodResponse } from 'domains/requestComposer/types/tron';
import { requestComposerFetchTronChainRequest } from 'domains/requestComposer/actions/tron/fetchTronChainRequest';
import {
  resetEVMMethod,
  selectEVMMethod,
} from 'domains/requestComposer/store/requestComposerSlice';
import { useOnUnmount } from 'modules/common/hooks/useOnUnmount';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

export const defaultData: FetchTronChainRequestResult = {
  error: undefined,
  response: undefined,
  time: 0,
};

export const useTronChainRequest = (): ComposerRequest<
  TronChainMethod,
  TronChainMethodResponse
> => {
  const [
    ,
    {
      data: { response, error, time } = defaultData,
      isLoading,
      isUninitialized,
    },
  ] = useQueryEndpoint(requestComposerFetchTronChainRequest);

  const method = useSelector(selectEVMMethod) as [TronChainMethod] | undefined;

  const dispatch = useDispatch();

  useOnUnmount(() => {
    dispatch(resetEVMMethod());
  });

  return {
    error,
    method,
    response,
    time,
    withResponse: !isLoading && !isUninitialized && !error,
  };
};

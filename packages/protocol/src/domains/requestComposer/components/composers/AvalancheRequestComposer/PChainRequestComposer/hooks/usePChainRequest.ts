import { useDispatch, useSelector } from 'react-redux';

import { ComposerRequest } from 'domains/requestComposer/hooks/useRequestComposerLogs';
import { PChainMethod } from 'domains/requestComposer/constants/avalanche';
import { PChainMethodResponse } from 'domains/requestComposer/types/avalanche';
import {
  FetchPChainRequestResult,
  requestComposerFetchPChainRequest,
} from 'domains/requestComposer/actions/avalanche/fetchPChainRequest';
import {
  resetEVMMethod,
  selectEVMMethod,
} from 'domains/requestComposer/store/requestComposerSlice';
import { useOnUnmount } from 'modules/common/hooks/useOnUnmount';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

const defaultData: FetchPChainRequestResult = {
  error: undefined,
  response: undefined,
  time: 0,
};

export const usePChainRequest = (): ComposerRequest<
  PChainMethod,
  PChainMethodResponse
> => {
  const [
    ,
    {
      data: { response, error, time } = defaultData,
      isLoading,
      isUninitialized,
    },
    reset,
  ] = useQueryEndpoint(requestComposerFetchPChainRequest);

  const method = useSelector(selectEVMMethod) as [PChainMethod] | undefined;

  const dispatch = useDispatch();

  useOnUnmount(() => {
    dispatch(resetEVMMethod());

    reset();
  });

  return {
    error,
    method,
    response,
    time,
    withResponse: !isLoading && !isUninitialized && !error,
  };
};

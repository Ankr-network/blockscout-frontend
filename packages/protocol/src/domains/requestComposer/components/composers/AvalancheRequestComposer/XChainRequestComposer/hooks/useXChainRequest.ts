import { useDispatch, useSelector } from 'react-redux';

import { ComposerRequest } from 'domains/requestComposer/hooks/useRequestComposerLogs';
import {
  FetchXChainRequestResult,
  requestComposerFetchXChainRequest,
} from 'domains/requestComposer/actions/avalanche/fetchXChainRequest';
import { XChainMethod } from 'domains/requestComposer/constants/avalanche';
import { XChainMethodResponse } from 'domains/requestComposer/types/avalanche';
import {
  resetEVMMethod,
  selectEVMMethod,
} from 'domains/requestComposer/store/requestComposerSlice';
import { useOnUnmount } from 'modules/common/hooks/useOnUnmount';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

const defaultData: FetchXChainRequestResult = {
  error: undefined,
  response: undefined,
  time: 0,
};

export const useXChainRequest = (): ComposerRequest<
  XChainMethod,
  XChainMethodResponse
> => {
  const [
    ,
    {
      data: { response, error, time } = defaultData,
      isLoading,
      isUninitialized,
    },
    reset,
  ] = useQueryEndpoint(requestComposerFetchXChainRequest);

  const method = useSelector(selectEVMMethod) as [XChainMethod] | undefined;

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

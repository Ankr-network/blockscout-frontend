import { useDispatch, useSelector } from 'react-redux';

import { CChainMethod } from 'domains/requestComposer/constants/avalanche';
import { CChainMethodResponse } from 'domains/requestComposer/types/avalanche';
import { ComposerRequest } from 'domains/requestComposer/hooks/useRequestComposerLogs';
import {
  FetchCChainRequestResult,
  requestComposerFetchCChainRequest,
} from 'domains/requestComposer/actions/avalanche/fetchCChainRequest';
import {
  resetEVMMethod,
  selectEVMMethod,
} from 'domains/requestComposer/store/requestComposerSlice';
import { useOnUnmount } from 'modules/common/hooks/useOnUnmount';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

const defaultData: FetchCChainRequestResult = {
  response: undefined,
  error: undefined,
  time: 0,
};

export const useCChainRequest = (): ComposerRequest<
  CChainMethod,
  CChainMethodResponse
> => {
  const [
    ,
    {
      data: { response, error, time } = defaultData,
      isLoading,
      isUninitialized,
    },
    reset,
  ] = useQueryEndpoint(requestComposerFetchCChainRequest);

  const method = useSelector(selectEVMMethod) as [CChainMethod] | undefined;

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

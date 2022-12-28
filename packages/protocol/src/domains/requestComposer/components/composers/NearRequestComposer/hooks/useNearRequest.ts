import { useDispatch, useSelector } from 'react-redux';

import { ComposerRequest } from 'domains/requestComposer/hooks/useRequestComposerLogs';
import {
  FetchNearRequestResult,
  requestComposerFetchNearRequest,
} from 'domains/requestComposer/actions/near/fetchNearRequest';
import { NearMethod } from 'domains/requestComposer/constants/near';
import { NearMethodResponse } from 'domains/requestComposer/types/near';
import {
  resetEVMMethod,
  selectEVMMethod,
} from 'domains/requestComposer/store/requestComposerSlice';
import { useOnUnmount } from 'modules/common/hooks/useOnUnmount';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

const defaultData: FetchNearRequestResult = {
  error: undefined,
  response: undefined,
  time: 0,
};

export const useNearRequest = (): ComposerRequest<
  NearMethod,
  NearMethodResponse
> => {
  const [
    ,
    {
      data: { response, error, time } = defaultData,
      isLoading,
      isUninitialized,
    },
    reset,
  ] = useQueryEndpoint(requestComposerFetchNearRequest);

  const method = useSelector(selectEVMMethod) as [NearMethod] | undefined;

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

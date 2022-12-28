import { useDispatch, useSelector } from 'react-redux';

import { ComposerRequest } from 'domains/requestComposer/hooks/useRequestComposerLogs';
import {
  HarmonyMethod,
  HarmonyMethodResponse,
} from 'domains/requestComposer/constants/harmony';
import {
  FetchHarmonyChainRequestResult,
  requestComposerFetchHarmonyChainRequest,
} from 'domains/requestComposer/actions/harmony/fetchHarmonyChainReqeust';
import {
  resetHarmonyMethod,
  selectHarmonyMethod,
} from 'domains/requestComposer/store/requestComposerSlice';
import { useOnUnmount } from 'modules/common/hooks/useOnUnmount';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

const defaultData: FetchHarmonyChainRequestResult = {
  error: undefined,
  response: undefined,
  time: 0,
};

export const useHarmonyChainRequest = (): ComposerRequest<
  HarmonyMethod,
  HarmonyMethodResponse
> => {
  const [
    ,
    {
      data: { response, error, time } = defaultData,
      isLoading,
      isUninitialized,
    },
    reset,
  ] = useQueryEndpoint(requestComposerFetchHarmonyChainRequest);

  const method = useSelector(selectHarmonyMethod) as
    | [HarmonyMethod]
    | undefined;

  const dispatch = useDispatch();

  useOnUnmount(() => {
    dispatch(resetHarmonyMethod());

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

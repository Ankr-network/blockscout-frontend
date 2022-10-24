import { resetRequests } from '@redux-requests/core';
import { useQuery } from '@redux-requests/react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchHarmonyChainReqeust } from 'domains/requestComposer/actions/harmony/fetchHarmonyChainReqeust';
import {
  resetEVMMethod,
  selectEVMMethod,
} from 'domains/requestComposer/store/requestComposerSlice';
import { useOnUnmount } from 'modules/common/hooks/useOnUnmount';
import { ComposerRequest } from '../../hooks/useRequestComposerLogs';
import {
  HarmonyMethod,
  HarmonyMethodResponse,
} from 'domains/requestComposer/constants/harmony';

export const useHarmonyChainRequest = (): ComposerRequest<
  HarmonyMethod,
  HarmonyMethodResponse
> => {
  const {
    data: { response, error, time },
    loading,
    pristine,
  } = useQuery({
    defaultData: { time: 0 },
    type: fetchHarmonyChainReqeust,
  });

  const method = useSelector(selectEVMMethod) as [HarmonyMethod] | undefined;

  const dispatch = useDispatch();

  useOnUnmount(() => {
    dispatch(resetEVMMethod());
    dispatch(resetRequests([fetchHarmonyChainReqeust.toString()]));
  });

  return {
    error,
    method,
    response,
    time,
    withResponse: !loading && !pristine && !error,
  };
};

import { resetRequests } from '@redux-requests/core';
import { useQuery } from '@redux-requests/react';
import { useDispatch, useSelector } from 'react-redux';

import {
  resetEVMMethod,
  selectEVMMethod,
} from 'domains/requestComposer/store/requestComposerSlice';
import { useOnUnmount } from 'modules/common/hooks/useOnUnmount';
import { ComposerRequest } from 'domains/requestComposer/hooks/useRequestComposerLogs';
import { XChainMethod } from 'domains/requestComposer/constants/avalanche';
import { XChainMethodResponse } from 'domains/requestComposer/types/avalanche';
import { fetchXChainRequest } from 'domains/requestComposer/actions/avalanche/fetchXChainRequest';

export const useXChainRequest = (): ComposerRequest<
  XChainMethod,
  XChainMethodResponse
> => {
  const {
    data: { response, error, time },
    loading,
    pristine,
  } = useQuery({ defaultData: { time: 0 }, type: fetchXChainRequest });

  const method = useSelector(selectEVMMethod) as [XChainMethod] | undefined;

  const dispatch = useDispatch();

  useOnUnmount(() => {
    dispatch(resetEVMMethod());
    dispatch(resetRequests([fetchXChainRequest.toString()]));
  });

  return {
    error,
    method,
    response,
    time,
    withResponse: !loading && !pristine && !error,
  };
};

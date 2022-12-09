import { resetRequests } from '@redux-requests/core';
import { useQuery } from '@redux-requests/react';
import { useDispatch, useSelector } from 'react-redux';

import {
  resetEVMMethod,
  selectEVMMethod,
} from 'domains/requestComposer/store/requestComposerSlice';
import { useOnUnmount } from 'modules/common/hooks/useOnUnmount';
import { ComposerRequest } from 'domains/requestComposer/hooks/useRequestComposerLogs';
import { PChainMethod } from 'domains/requestComposer/constants/avalanche';
import { PChainMethodResponse } from 'domains/requestComposer/types/avalanche';
import { fetchPChainRequest } from 'domains/requestComposer/actions/avalanche/fetchPChainRequest';

export const usePChainRequest = (): ComposerRequest<
  PChainMethod,
  PChainMethodResponse
> => {
  const {
    data: { response, error, time },
    loading,
    pristine,
  } = useQuery({ defaultData: { time: 0 }, type: fetchPChainRequest });

  const method = useSelector(selectEVMMethod) as [PChainMethod] | undefined;

  const dispatch = useDispatch();

  useOnUnmount(() => {
    dispatch(resetEVMMethod());
    dispatch(resetRequests([fetchPChainRequest.toString()]));
  });

  return {
    error,
    method,
    response,
    time,
    withResponse: !loading && !pristine && !error,
  };
};

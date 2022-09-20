import { resetRequests } from '@redux-requests/core';
import { useQuery } from '@redux-requests/react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCChainRequest } from 'domains/requestComposer/actions/avalanche/fetchCChainRequest';
import {
  resetEVMMethod,
  selectEVMMethod,
} from 'domains/requestComposer/store/requestComposerSlice';
import { useOnUnmount } from 'modules/common/hooks/useOnUnmount';
import { ComposerRequest } from '../../../hooks/useRequestComposerLogs';
import { CChainMethod } from 'domains/requestComposer/constants/avalanche';
import { CChainMethodResponse } from 'domains/requestComposer/types/avalanche';

export const useCChainRequest = (): ComposerRequest<
  CChainMethod,
  CChainMethodResponse
> => {
  const {
    data: { response, error, time },
    loading,
    pristine,
  } = useQuery({ defaultData: { time: 0 }, type: fetchCChainRequest });

  const method = useSelector(selectEVMMethod) as [CChainMethod] | undefined;

  const dispatch = useDispatch();

  useOnUnmount(() => {
    dispatch(resetEVMMethod());
    dispatch(resetRequests([fetchCChainRequest.toString()]));
  });

  return {
    error,
    method,
    response,
    time,
    withResponse: !loading && !pristine && !error,
  };
};

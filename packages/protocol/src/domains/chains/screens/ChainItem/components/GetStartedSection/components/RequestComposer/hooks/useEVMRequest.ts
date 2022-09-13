import { resetRequests } from '@redux-requests/core';
import { useQuery } from '@redux-requests/react';
import { useDispatch, useSelector } from 'react-redux';

import { EVMMethod } from 'domains/requestComposer/constants';
import { EVMMethodResponse } from 'domains/requestComposer/types';
import { fetchEVMRequest } from 'domains/requestComposer/actions/fetchEVMRequest';
import {
  resetEVMMethod,
  selectEVMMethod,
} from 'domains/requestComposer/store/requestComposerSlice';
import { useOnUnmount } from 'modules/common/hooks/useOnUnmount';

export interface EVMRequest {
  error: unknown;
  method?: [EVMMethod];
  response?: [EVMMethodResponse];
  time: number;
  withResponse: boolean;
}

export const useEVMRequest = (): EVMRequest => {
  const {
    data: { response, error, time },
    loading,
    pristine,
  } = useQuery({ defaultData: { time: 0 }, type: fetchEVMRequest });

  const method = useSelector(selectEVMMethod);

  const dispatch = useDispatch();
  useOnUnmount(() => {
    dispatch(resetEVMMethod());
    dispatch(resetRequests([fetchEVMRequest.toString()]));
  });

  return {
    error,
    method,
    response,
    time,
    withResponse: !loading && !pristine && !error,
  };
};

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { ComposerRequest } from 'domains/requestComposer/hooks/useRequestComposerLogs';
import { EVMMethod } from 'domains/requestComposer/constants';
import { EVMMethodResponse } from 'domains/requestComposer/types';
import { requestComposerFetchEVMRequest } from 'domains/requestComposer/actions/fetchEVMRequest';
import {
  resetEVMMethod,
  selectEVMMethod,
} from 'domains/requestComposer/store/requestComposerSlice';
import { useOnUnmount } from 'modules/common/hooks/useOnUnmount';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

export interface EVMRequest {
  error: unknown;
  method?: [EVMMethod];
  response?: [EVMMethodResponse];
  time: number;
  withResponse: boolean;
}

const defaultData = {
  response: undefined,
  error: undefined,
  time: 0,
};

export const useEVMRequest = (): ComposerRequest<
  EVMMethod,
  EVMMethodResponse
> => {
  const [
    ,
    {
      data: { response, error, time } = defaultData,
      isLoading,
      isUninitialized,
    },
    reset,
  ] = useQueryEndpoint(requestComposerFetchEVMRequest);

  const method = useSelector(selectEVMMethod) as [EVMMethod] | undefined;

  const dispatch = useDispatch();

  useOnUnmount(() => {
    dispatch(resetEVMMethod());
  });

  useEffect(() => reset, [reset]);

  return {
    error,
    method,
    response,
    time,
    withResponse: !isLoading && !isUninitialized && !error && !!time,
  };
};

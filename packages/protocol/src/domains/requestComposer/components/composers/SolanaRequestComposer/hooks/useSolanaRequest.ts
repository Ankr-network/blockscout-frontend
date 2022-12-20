import { useDispatch, useSelector } from 'react-redux';

import { ComposerRequest } from 'domains/requestComposer/hooks/useRequestComposerLogs';
import {
  FetchSolanaRequestResult,
  requestComposerFetchSolanaRequest,
} from 'domains/requestComposer/actions/solana/fetchSolanaRequest';
import { SolanaMethod } from 'domains/requestComposer/constants/solana';
import { SolanaMethodResponse } from 'domains/requestComposer/types/solana';
import {
  resetEVMMethod,
  selectEVMMethod,
} from 'domains/requestComposer/store/requestComposerSlice';
import { useOnUnmount } from 'modules/common/hooks/useOnUnmount';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

export type SolanaRequest = ComposerRequest<SolanaMethod, SolanaMethodResponse>;

const defaultData: FetchSolanaRequestResult = {
  error: undefined,
  response: undefined,
  time: 0,
};

export const useSolanaRequest = (): SolanaRequest => {
  const [
    ,
    {
      data: { error, response, time } = defaultData,
      isLoading,
      isUninitialized,
    },
    reset,
  ] = useQueryEndpoint(requestComposerFetchSolanaRequest);

  const method = useSelector(selectEVMMethod) as [SolanaMethod] | undefined;

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

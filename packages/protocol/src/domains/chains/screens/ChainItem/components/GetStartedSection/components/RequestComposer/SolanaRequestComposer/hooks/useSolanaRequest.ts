import { resetRequests } from '@redux-requests/core';
import { useQuery } from '@redux-requests/react';
import { useDispatch, useSelector } from 'react-redux';

import { ComposerRequest } from '../../hooks/useRequestComposerLogs';
import { SolanaMethod } from 'domains/requestComposer/constants/solana';
import { SolanaMethodResponse } from 'domains/requestComposer/types/solana';
import { fetchSolanaRequest } from 'domains/requestComposer/actions/solana/fetchSolanaRequest';
import {
  resetEVMMethod,
  selectEVMMethod,
} from 'domains/requestComposer/store/requestComposerSlice';
import { useOnUnmount } from 'modules/common/hooks/useOnUnmount';

export type SolanaRequest = ComposerRequest<SolanaMethod, SolanaMethodResponse>;

export const useSolanaRequest = (): SolanaRequest => {
  const {
    data: { response, error, time },
    loading,
    pristine,
  } = useQuery({ defaultData: { time: 0 }, type: fetchSolanaRequest });

  const method = useSelector(selectEVMMethod) as [SolanaMethod] | undefined;

  const dispatch = useDispatch();

  useOnUnmount(() => {
    dispatch(resetEVMMethod());
    dispatch(resetRequests([fetchSolanaRequest.toString()]));
  });

  return {
    error,
    method,
    response,
    time,
    withResponse: !loading && !pristine && !error,
  };
};

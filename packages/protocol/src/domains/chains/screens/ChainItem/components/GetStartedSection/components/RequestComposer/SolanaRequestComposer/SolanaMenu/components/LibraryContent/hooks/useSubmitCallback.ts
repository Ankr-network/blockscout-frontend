import { useCallback } from 'react';
import { useDispatchRequest } from '@redux-requests/react';

import { EndpointGroup } from 'modules/endpoints/types';
import { MethodsRequest } from 'domains/requestComposer/types';
import {
  SolanaLibraryID,
  SolanaMethod,
} from 'domains/requestComposer/constants/solana';
import { fetchSolanaRequest } from 'domains/requestComposer/actions/solana/fetchSolanaRequest';

export interface SubmitCallbackParams {
  group: EndpointGroup;
  libraryID: SolanaLibraryID;
}

export const useSubmitCallback = ({
  group,
  libraryID,
}: SubmitCallbackParams) => {
  const dispatchRequest = useDispatchRequest();

  const web3HttpUrl = group.urls[0].rpc;

  return useCallback(
    (data: MethodsRequest<SolanaMethod>) => {
      dispatchRequest(fetchSolanaRequest(libraryID, data, web3HttpUrl));
    },
    [dispatchRequest, web3HttpUrl, libraryID],
  );
};

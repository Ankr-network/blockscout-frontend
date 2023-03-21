import { useCallback, useContext } from 'react';

import { CountdownContext } from 'domains/requestComposer/components/composers/const';
import { EndpointGroup } from 'modules/endpoints/types';
import { MethodsRequest } from 'domains/requestComposer/types';
import {
  SolanaLibraryID,
  SolanaMethod,
} from 'domains/requestComposer/constants/solana';
import { requestComposerFetchSolanaRequest } from 'domains/requestComposer/actions/solana/fetchSolanaRequest';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

export interface SubmitCallbackParams {
  group: EndpointGroup;
  libraryID: SolanaLibraryID;
}

export const useSubmitCallback = ({
  group,
  libraryID,
}: SubmitCallbackParams) => {
  const [fetchSolanaRequest, , reset] = useQueryEndpoint(
    requestComposerFetchSolanaRequest,
  );

  const web3URL = group.urls[0].rpc;

  const { start } = useContext(CountdownContext);

  return useCallback(
    (params: MethodsRequest<SolanaMethod>) => {
      // We have to reset the request before sending because RTK query considers
      // values of reference data types with different references but with the
      // same inner values as equal values.
      reset();
      fetchSolanaRequest({ libraryID, params, web3URL }).then(start);
    },
    [fetchSolanaRequest, libraryID, reset, start, web3URL],
  );
};

import { Box } from '@material-ui/core';
import { useCallback } from 'react';

import {
  AvalancheLibraryID,
  PChainMethod,
} from 'domains/requestComposer/constants/avalanche';
import { EndpointGroup } from 'modules/endpoints/types';
import { MethodsRequest } from 'domains/requestComposer/types';
import { PChainMethodsForm } from '../PChainMethodsForm';
import { requestComposerFetchPChainRequest } from 'domains/requestComposer/actions/avalanche/fetchPChainRequest';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

export interface ILibraryContentProps {
  group: EndpointGroup;
  libraryID: AvalancheLibraryID;
}

export const LibraryContent = ({ group, libraryID }: ILibraryContentProps) => {
  const [fetchPChainRequest, , reset] = useQueryEndpoint(
    requestComposerFetchPChainRequest,
  );

  const web3URL = group.urls[0].rpc;

  const handleSubmit = useCallback(
    (params: MethodsRequest<PChainMethod>) => {
      // We have to reset the request before sending because RTK query considers
      // values of reference data types with different references but with the
      // same inner values as equal values.
      reset();
      fetchPChainRequest({ libraryID, params, web3URL });
    },
    [fetchPChainRequest, libraryID, reset, web3URL],
  );

  return (
    <Box>
      <PChainMethodsForm
        onSubmit={handleSubmit}
        group={group}
        libraryID={libraryID}
      />
    </Box>
  );
};

import { Box } from '@material-ui/core';
import { useCallback } from 'react';

import {
  AvalancheLibraryID,
  XChainMethod,
} from 'domains/requestComposer/constants/avalanche';
import { EndpointGroup } from 'modules/endpoints/types';
import { MethodsRequest } from 'domains/requestComposer/types';
import { XChainMethodsForm } from '../XChainMethodsForm';
import { requestComposerFetchXChainRequest } from 'domains/requestComposer/actions/avalanche/fetchXChainRequest';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

interface ILibraryContentProps {
  group: EndpointGroup;
  libraryID: AvalancheLibraryID;
}

export const LibraryContent = ({ group, libraryID }: ILibraryContentProps) => {
  const [fetchXChainRequest, , reset] = useQueryEndpoint(
    requestComposerFetchXChainRequest,
  );

  const web3URL = group.urls[0].rpc;

  const handleSubmit = useCallback(
    (params: MethodsRequest<XChainMethod>) => {
      // We have to reset the request before sending because RTK query considers
      // values of reference data types with different references but with the
      // same inner values as equal values.
      reset();
      fetchXChainRequest({ libraryID, params, web3URL });
    },
    [fetchXChainRequest, libraryID, reset, web3URL],
  );

  return (
    <Box>
      <XChainMethodsForm
        onSubmit={handleSubmit}
        group={group}
        libraryID={libraryID}
      />
    </Box>
  );
};

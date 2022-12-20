import { Box } from '@material-ui/core';
import { useCallback } from 'react';

import {
  AvalancheLibraryID,
  CChainMethod,
} from 'domains/requestComposer/constants/avalanche';
import { CChainMethodsForm } from '../CChainMethodsForm';
import { EndpointGroup } from 'modules/endpoints/types';
import { MethodsRequest } from 'domains/requestComposer/types';
import { requestComposerFetchCChainRequest } from 'domains/requestComposer/actions/avalanche/fetchCChainRequest';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

interface ILibraryContentProps {
  group: EndpointGroup;
  libraryID: AvalancheLibraryID;
}

export const LibraryContent = ({ group, libraryID }: ILibraryContentProps) => {
  const [fetchCChainRequest, , reset] = useQueryEndpoint(
    requestComposerFetchCChainRequest,
  );

  const web3URL = group.urls[0].rpc;

  const handleSubmit = useCallback(
    (params: MethodsRequest<CChainMethod>) => {
      // We have to reset the request before sending because RTK query considers
      // values of reference data types with different references but with the
      // same inner values as equal values.
      reset();
      fetchCChainRequest({ libraryID, params, web3URL });
    },
    [fetchCChainRequest, libraryID, reset, web3URL],
  );

  return (
    <Box>
      <CChainMethodsForm
        onSubmit={handleSubmit}
        group={group}
        libraryID={libraryID}
      />
    </Box>
  );
};

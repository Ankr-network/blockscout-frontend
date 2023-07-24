import { useCallback, useContext } from 'react';
import { Box } from '@mui/material';

import {
  AvalancheLibraryID,
  PChainMethod,
} from 'domains/requestComposer/constants/avalanche';
import { CountdownContext } from 'domains/requestComposer/components/composers/const';
import { EndpointGroup } from 'modules/endpoints/types';
import { MethodsRequest } from 'domains/requestComposer/types';
import { requestComposerFetchPChainRequest } from 'domains/requestComposer/actions/avalanche/fetchPChainRequest';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

import { PChainMethodsForm } from '../PChainMethodsForm';

export interface ILibraryContentProps {
  group: EndpointGroup;
  libraryID: AvalancheLibraryID;
}

export const LibraryContent = ({ group, libraryID }: ILibraryContentProps) => {
  const [fetchPChainRequest, , reset] = useQueryEndpoint(
    requestComposerFetchPChainRequest,
  );

  const web3URL = group.urls[0].rpc;

  const { start } = useContext(CountdownContext);

  const handleSubmit = useCallback(
    (params: MethodsRequest<PChainMethod>) => {
      // We have to reset the request before sending because RTK query considers
      // values of reference data types with different references but with the
      // same inner values as equal values.
      reset();
      fetchPChainRequest({ libraryID, params, web3URL }).then(start);
    },
    [fetchPChainRequest, libraryID, reset, start, web3URL],
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

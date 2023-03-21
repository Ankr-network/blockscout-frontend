import { useCallback, useContext } from 'react';
import { Box } from '@mui/material';

import {
  AvalancheLibraryID,
  XChainMethod,
} from 'domains/requestComposer/constants/avalanche';
import { CountdownContext } from 'domains/requestComposer/components/composers/const';
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

  const { start } = useContext(CountdownContext);

  const handleSubmit = useCallback(
    (params: MethodsRequest<XChainMethod>) => {
      // We have to reset the request before sending because RTK query considers
      // values of reference data types with different references but with the
      // same inner values as equal values.
      reset();
      fetchXChainRequest({ libraryID, params, web3URL }).then(start);
    },
    [fetchXChainRequest, libraryID, reset, start, web3URL],
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

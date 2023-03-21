import { useCallback, useContext } from 'react';
import { Box } from '@mui/material';

import {
  AvalancheLibraryID,
  CChainMethod,
} from 'domains/requestComposer/constants/avalanche';
import { CChainMethodsForm } from '../CChainMethodsForm';
import { CountdownContext } from 'domains/requestComposer/components/composers/const';
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

  const { start } = useContext(CountdownContext);

  const handleSubmit = useCallback(
    (params: MethodsRequest<CChainMethod>) => {
      // We have to reset the request before sending because RTK query considers
      // values of reference data types with different references but with the
      // same inner values as equal values.
      reset();
      fetchCChainRequest({ libraryID, params, web3URL }).then(start);
    },
    [fetchCChainRequest, libraryID, reset, start, web3URL],
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

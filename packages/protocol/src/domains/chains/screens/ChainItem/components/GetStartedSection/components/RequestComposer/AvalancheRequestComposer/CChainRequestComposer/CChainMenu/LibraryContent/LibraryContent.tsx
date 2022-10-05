import { useCallback } from 'react';
import { Box } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';

import { fetchCChainRequest } from 'domains/requestComposer/actions/avalanche/fetchCChainRequest';
import { CChainMethodsForm } from '../CChainMethodsForm';
import { EndpointGroup } from 'modules/endpoints/types';
import {
  AvalancheLibraryID,
  CChainMethod,
} from 'domains/requestComposer/constants/avalanche';
import { MethodsRequest } from 'domains/requestComposer/types';

interface ILibraryContentProps {
  group: EndpointGroup;
  libraryID: AvalancheLibraryID;
}

export const LibraryContent = ({ group, libraryID }: ILibraryContentProps) => {
  const dispatchRequest = useDispatchRequest();

  const web3HttpUrl = group.urls[0].rpc;

  const handleSubmit = useCallback(
    (data: MethodsRequest<CChainMethod>) => {
      dispatchRequest(fetchCChainRequest(libraryID, data, web3HttpUrl));
    },
    [dispatchRequest, web3HttpUrl, libraryID],
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

import { useCallback } from 'react';
import { Box } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';

import { PChainMethodsForm } from '../PChainMethodsForm';
import { EndpointGroup } from 'modules/endpoints/types';
import {
  AvalancheLibraryID,
  PChainMethod,
} from 'domains/requestComposer/constants/avalanche';
import { MethodsRequest } from 'domains/requestComposer/types';
import { fetchPChainRequest } from 'domains/requestComposer/actions/avalanche/fetchPChainRequest';

interface ILibraryContentProps {
  group: EndpointGroup;
  libraryID: AvalancheLibraryID;
}

export const LibraryContent = ({ group, libraryID }: ILibraryContentProps) => {
  const dispatchRequest = useDispatchRequest();

  const web3HttpUrl = group.urls[0].rpc;

  const handleSubmit = useCallback(
    (data: MethodsRequest<PChainMethod>) => {
      dispatchRequest(fetchPChainRequest(libraryID, data, web3HttpUrl));
    },
    [dispatchRequest, web3HttpUrl, libraryID],
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

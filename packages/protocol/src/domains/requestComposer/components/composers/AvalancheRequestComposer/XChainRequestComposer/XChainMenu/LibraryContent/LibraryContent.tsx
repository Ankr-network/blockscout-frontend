import { useCallback } from 'react';
import { Box } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';

import { XChainMethodsForm } from '../XChainMethodsForm';
import { EndpointGroup } from 'modules/endpoints/types';
import {
  AvalancheLibraryID,
  XChainMethod,
} from 'domains/requestComposer/constants/avalanche';
import { MethodsRequest } from 'domains/requestComposer/types';
import { fetchXChainRequest } from 'domains/requestComposer/actions/avalanche/fetchXChainRequest';

interface ILibraryContentProps {
  group: EndpointGroup;
  libraryID: AvalancheLibraryID;
}

export const LibraryContent = ({ group, libraryID }: ILibraryContentProps) => {
  const dispatchRequest = useDispatchRequest();

  const web3HttpUrl = group.urls[0].rpc;

  const handleSubmit = useCallback(
    (data: MethodsRequest<XChainMethod>) => {
      dispatchRequest(fetchXChainRequest(libraryID, data, web3HttpUrl));
    },
    [dispatchRequest, web3HttpUrl, libraryID],
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

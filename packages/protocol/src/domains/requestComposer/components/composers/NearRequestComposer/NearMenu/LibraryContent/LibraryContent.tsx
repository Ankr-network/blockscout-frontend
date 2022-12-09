import { Box } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';
import { useCallback } from 'react';

import { fetchNearRequest } from 'domains/requestComposer/actions/near/fetchNearRequest';
import {
  NearLibraryID,
  NearMethod,
} from 'domains/requestComposer/constants/near';
import { MethodsRequest } from 'domains/requestComposer/types';
import { EndpointGroup } from 'modules/endpoints/types';
import { NearMethodsForm } from '../NearMethodsForm';

interface ILibraryContentProps {
  group: EndpointGroup;
  libraryID: NearLibraryID;
}

export const LibraryContent = ({ group, libraryID }: ILibraryContentProps) => {
  const dispatchRequest = useDispatchRequest();

  const web3HttpUrl = group.urls[0].rpc;

  const handleSubmit = useCallback(
    (data: MethodsRequest<NearMethod>) => {
      dispatchRequest(fetchNearRequest(libraryID, data, web3HttpUrl));
    },
    [dispatchRequest, web3HttpUrl, libraryID],
  );

  return (
    <Box>
      <NearMethodsForm
        onSubmit={handleSubmit}
        group={group}
        libraryID={libraryID}
      />
    </Box>
  );
};

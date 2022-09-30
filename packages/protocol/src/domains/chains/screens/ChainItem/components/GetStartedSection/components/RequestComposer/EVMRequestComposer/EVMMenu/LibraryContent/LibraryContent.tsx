import { useCallback } from 'react';
import { Box } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';

import { fetchEVMRequest } from 'domains/requestComposer/actions/fetchEVMRequest';
import { EVMLibraryID, EVMMethod } from 'domains/requestComposer/constants';
import { MethodsRequest } from 'domains/requestComposer/types';
import { EVMMethodsForm } from '../EVMMethodsForm';
import { EndpointGroup } from 'modules/endpoints/types';

interface ILibraryContentProps {
  group: EndpointGroup;
  libraryID: EVMLibraryID;
}

export const LibraryContent = ({ group, libraryID }: ILibraryContentProps) => {
  const dispatchRequest = useDispatchRequest();

  const web3HttpUrl = group.urls[0].rpc;

  const handleSubmit = useCallback(
    (data: MethodsRequest<EVMMethod>) => {
      dispatchRequest(fetchEVMRequest(libraryID, data, web3HttpUrl));
    },
    [dispatchRequest, web3HttpUrl, libraryID],
  );

  return (
    <Box>
      <EVMMethodsForm
        onSubmit={handleSubmit}
        group={group}
        libraryID={libraryID}
      />
    </Box>
  );
};

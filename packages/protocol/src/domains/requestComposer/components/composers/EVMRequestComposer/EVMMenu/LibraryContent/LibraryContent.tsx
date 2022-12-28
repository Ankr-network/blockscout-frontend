import { Box } from '@material-ui/core';
import { useCallback } from 'react';

import { EndpointGroup } from 'modules/endpoints/types';
import { EVMLibraryID, EVMMethod } from 'domains/requestComposer/constants';
import { EVMMethodsForm } from '../EVMMethodsForm';
import { MethodsRequest } from 'domains/requestComposer/types';
import { requestComposerFetchEVMRequest } from 'domains/requestComposer/actions/fetchEVMRequest';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

interface ILibraryContentProps {
  group: EndpointGroup;
  libraryID: EVMLibraryID;
}

export const LibraryContent = ({ group, libraryID }: ILibraryContentProps) => {
  const web3URL = group.urls[0].rpc;

  const [fetchEVMRequest, , reset] = useQueryEndpoint(
    requestComposerFetchEVMRequest,
  );

  const handleSubmit = useCallback(
    (params: MethodsRequest<EVMMethod>) => {
      // We have to reset the request before sending because RTK query considers
      // values of reference data types with different references but with the
      // same inner values as equal values.
      reset();
      fetchEVMRequest({ libraryID, params, web3URL });
    },
    [fetchEVMRequest, libraryID, reset, web3URL],
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

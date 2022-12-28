import { Box } from '@material-ui/core';
import { useCallback } from 'react';

import { EndpointGroup } from 'modules/endpoints/types';
import { MethodsRequest } from 'domains/requestComposer/types';
import {
  NearLibraryID,
  NearMethod,
} from 'domains/requestComposer/constants/near';
import { NearMethodsForm } from '../NearMethodsForm';
import { requestComposerFetchNearRequest } from 'domains/requestComposer/actions/near/fetchNearRequest';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

interface ILibraryContentProps {
  group: EndpointGroup;
  libraryID: NearLibraryID;
}

export const LibraryContent = ({ group, libraryID }: ILibraryContentProps) => {
  const [fetchNearRequest, , reset] = useQueryEndpoint(
    requestComposerFetchNearRequest,
  );

  const web3URL = group.urls[0].rpc;

  const handleSubmit = useCallback(
    (params: MethodsRequest<NearMethod>) => {
      // We have to reset the request before sending because RTK query considers
      // values of reference data types with different references but with the
      // same inner values as equal values.
      reset();
      fetchNearRequest({ libraryID, params, web3URL });
    },
    [fetchNearRequest, libraryID, reset, web3URL],
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

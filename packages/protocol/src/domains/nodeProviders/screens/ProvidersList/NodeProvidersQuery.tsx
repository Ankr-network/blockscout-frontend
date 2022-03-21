import React from 'react';
import { useDispatchRequest } from '@redux-requests/react';

import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { fetchNodeProviders } from 'domains/nodeProviders/actions/fetchNodeProviders';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { ProvidersTable } from './components/ProvidersTable';

export const NodeProvidersQuery = () => {
  const dispatchRequest = useDispatchRequest();

  useOnMount(() => {
    dispatchRequest(fetchNodeProviders());
  });

  return (
    <Queries<ResponseData<typeof fetchNodeProviders>>
      requestActions={[fetchNodeProviders]}
    >
      {({ data }) => <ProvidersTable data={data} />}
    </Queries>
  );
};

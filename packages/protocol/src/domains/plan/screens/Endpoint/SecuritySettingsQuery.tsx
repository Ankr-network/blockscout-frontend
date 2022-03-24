import React, { useEffect } from 'react';
import { useDispatchRequest } from '@redux-requests/react';
import { Box } from '@material-ui/core';

import { Preloader } from 'uiKit/Preloader';
import { fetchSecuritySettings } from 'domains/nodeProviders/actions/fetchSecuritySettings';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { SecuritySettings } from './components/SecuritySettings';
import { PlanRoutesConfig } from 'domains/plan/Routes';

export const SecuritySettingsQuery = () => {
  const dispatchRequest = useDispatchRequest();
  const { chainId } = PlanRoutesConfig.addEndpoint.useParams();

  useEffect(() => {
    dispatchRequest(fetchSecuritySettings(chainId));
  }, [dispatchRequest, chainId]);

  return (
    <Queries<ResponseData<typeof fetchSecuritySettings>>
      requestActions={[fetchSecuritySettings]}
      spinner={
        <Box position="relative">
          <Preloader centered />
        </Box>
      }
    >
      {({ data }) => <SecuritySettings data={data} chainId={chainId} />}
    </Queries>
  );
};

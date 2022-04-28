import React, { useEffect } from 'react';
import { useDispatchRequest } from '@redux-requests/react';
import { fetchSecuritySettings } from 'domains/nodeProviders/actions/fetchSecuritySettings';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { SecuritySettings } from './components/SecuritySettings';
import { SecuritySettingsSkeleton } from './components/SecuritySettings/SecuritySettingsSkeleton';

export const SecuritySettingsQuery = ({ chainId }: { chainId: string }) => {
  const dispatchRequest = useDispatchRequest();

  useEffect(() => {
    dispatchRequest(fetchSecuritySettings(chainId));
  }, [dispatchRequest, chainId]);

  return (
    <Queries<ResponseData<typeof fetchSecuritySettings>>
      requestActions={[fetchSecuritySettings]}
      spinner={<SecuritySettingsSkeleton />}
    >
      {({ data }) => <SecuritySettings data={data} chainId={chainId} />}
    </Queries>
  );
};

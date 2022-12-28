import { useEffect } from 'react';

import { Queries } from 'modules/common/components/Queries/Queries';
import { SecuritySettings } from './components/SecuritySettings';
import {
  SecuritySettings as TSecuritySettings,
  useLazyInfrastructureFetchSecuritySettingsQuery,
} from 'domains/infrastructure/actions/fetchSecuritySettings';
import { SecuritySettingsSkeleton } from './components/SecuritySettings/SecuritySettingsSkeleton';

export const SecuritySettingsQuery = ({ chainId }: { chainId: string }) => {
  const [fetchSecuritySettings, state] =
    useLazyInfrastructureFetchSecuritySettingsQuery();

  useEffect(() => {
    fetchSecuritySettings(chainId);
  }, [fetchSecuritySettings, chainId]);

  return (
    <Queries<TSecuritySettings>
      queryStates={[state]}
      spinner={<SecuritySettingsSkeleton />}
    >
      {({ data = { domains: [], ips: [] } }) => (
        <SecuritySettings data={data} chainId={chainId} />
      )}
    </Queries>
  );
};

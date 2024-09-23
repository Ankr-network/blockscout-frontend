import { Queries } from 'modules/common/components/Queries/Queries';
import { SecuritySettings as TSecuritySettings } from 'domains/infrastructure/actions/fetchSecuritySettings';

import { SecuritySettings } from '../SecuritySettings';
import { SecuritySettingsSkeleton } from '../SecuritySettings/SecuritySettingsSkeleton';
import { useSecuritySettings } from '../../../../hooks/useSecuritySettings';

export const SecuritySection = ({ chainId }: { chainId: string }) => {
  const { jwtToken, state } = useSecuritySettings(chainId);

  return (
    <Queries<TSecuritySettings>
      queryStates={[state]}
      spinner={<SecuritySettingsSkeleton />}
    >
      {({ data = { domains: [], ips: [] } }) => (
        <SecuritySettings data={data} chainId={chainId} jwtToken={jwtToken} />
      )}
    </Queries>
  );
};

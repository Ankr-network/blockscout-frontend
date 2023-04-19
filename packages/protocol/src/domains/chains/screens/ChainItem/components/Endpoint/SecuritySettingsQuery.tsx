import { Queries } from 'modules/common/components/Queries/Queries';
import { SecuritySettings } from './components/SecuritySettings';
import { SecuritySettings as TSecuritySettings } from 'domains/infrastructure/actions/fetchSecuritySettings';
import { SecuritySettingsSkeleton } from './components/SecuritySettings/SecuritySettingsSkeleton';
import { useSecuritySettings } from '../../hooks/useSecuritySettings';

export const SecuritySettingsQuery = ({ chainId }: { chainId: string }) => {
  const { state, jwtToken } = useSecuritySettings(chainId);

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

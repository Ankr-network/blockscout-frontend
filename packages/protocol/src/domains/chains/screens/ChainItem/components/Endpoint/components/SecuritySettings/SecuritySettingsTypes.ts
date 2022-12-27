import { SecuritySettings } from 'domains/infrastructure/actions/fetchSecuritySettings';

export interface SecuritySettingsProps {
  chainId: string;
  data: SecuritySettings;
}

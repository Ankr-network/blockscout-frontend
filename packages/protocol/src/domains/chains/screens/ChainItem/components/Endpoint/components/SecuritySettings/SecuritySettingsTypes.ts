import { fetchSecuritySettings } from 'domains/infrastructure/actions/fetchSecuritySettings';
import { ResponseData } from 'modules/api/utils/ResponseData';

export interface SecuritySettingsProps {
  data: ResponseData<typeof fetchSecuritySettings>;
  chainId: string;
}

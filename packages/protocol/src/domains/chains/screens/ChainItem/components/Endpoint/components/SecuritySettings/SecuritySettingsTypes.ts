import { fetchSecuritySettings } from 'domains/nodeProviders/actions/fetchSecuritySettings';
import { ResponseData } from 'modules/api/utils/ResponseData';

export interface SecuritySettingsProps {
  data: ResponseData<typeof fetchSecuritySettings>;
  chainId: string;
}

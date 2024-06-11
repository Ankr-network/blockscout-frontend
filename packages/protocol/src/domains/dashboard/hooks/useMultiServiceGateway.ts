import {
  getAccountingGateway,
  getEnterpriseGateway,
} from 'modules/api/MultiService';
import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';

export const useMultiServiceGateway = () => {
  const { isEnterpriseClient, isEnterpriseStatusLoading } =
    useEnterpriseClientStatus();

  const gateway = isEnterpriseClient
    ? getEnterpriseGateway()
    : getAccountingGateway();

  return { gateway, isEnterpriseStatusLoading, isEnterpriseClient };
};

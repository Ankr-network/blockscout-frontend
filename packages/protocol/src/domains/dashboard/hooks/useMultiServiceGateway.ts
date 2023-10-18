import { accountingGateway, enterpriseGateway } from 'modules/api/MultiService';
import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';

export const useMultiServiceGateway = () => {
  const { isEnterpriseClient, isEnterpriseStatusLoading } =
    useEnterpriseClientStatus();

  const gateway = isEnterpriseClient ? enterpriseGateway : accountingGateway;

  return { gateway, isEnterpriseStatusLoading };
};

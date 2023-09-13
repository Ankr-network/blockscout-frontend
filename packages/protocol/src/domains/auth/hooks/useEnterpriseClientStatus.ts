import { useAppSelector } from 'store/useAppSelector';
import { selectEnterpriseStatus } from 'domains/enterprise/store/selectors';

export const useEnterpriseClientStatus = () => {
  const {
    data: isEnterpriseClient = false,
    isLoading,
    isUninitialized,
  } = useAppSelector(selectEnterpriseStatus);

  return {
    isEnterpriseClient,
    isLoadingEnterpriseStatus: isLoading || isUninitialized,
  };
};

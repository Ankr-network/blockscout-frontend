import { useAppSelector } from 'store/useAppSelector';
import { selectEnterpriseStatus } from 'domains/enterprise/store/selectors';

export const useEnterpriseClientStatus = () => {
  const {
    data: isEnterpriseClient = false,
    isLoading,
    isUninitialized,
    error,
  } = useAppSelector(selectEnterpriseStatus);

  return {
    isEnterpriseClient: error ? false : isEnterpriseClient,
    isEnterpriseStatusLoading: isLoading || isUninitialized,
  };
};

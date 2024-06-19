import { selectEnterpriseStatus } from 'domains/enterprise/actions/fetchIsEnterpriseClient';
import { useAppSelector } from 'store/useAppSelector';

export const useEnterpriseClientStatus = () => {
  const {
    data: isEnterpriseClient = false,
    error,
    isLoading,
    isUninitialized,
  } = useAppSelector(selectEnterpriseStatus);

  return {
    isEnterpriseClient: error ? false : isEnterpriseClient,
    isEnterpriseStatusLoading: isLoading || isUninitialized,
  };
};

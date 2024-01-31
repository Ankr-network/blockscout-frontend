import { selectEnterpriseStatus } from 'domains/enterprise/actions/fetchIsEnterpriseClient';
import { useAppSelector } from 'store/useAppSelector';

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

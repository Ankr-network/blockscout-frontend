import { resetRequests } from '@redux-requests/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useDispatch } from 'react-redux';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { checkExistPartnerCode } from 'modules/stake-bnb/actions/checkExistPartnerCode';

interface ICheckPartnerCode {
  isLoading: boolean;
  isValid: boolean;
  handleCheck: (code: string) => void;
}

export const useCheckPartnerCode = (): ICheckPartnerCode => {
  const dispatchRequest = useDispatchRequest();
  const dispatch = useDispatch();

  const { data, loading: isLoading } = useQuery({
    type: checkExistPartnerCode,
  });

  const handleCheck = (code: string): void => {
    if (code) {
      dispatchRequest(checkExistPartnerCode({ partnerCode: code }));
    }
  };

  useProviderEffect(() => {
    return () => {
      dispatch(resetRequests([checkExistPartnerCode.toString()]));
    };
  }, [dispatch]);

  return {
    isLoading,
    isValid: data ?? false,
    handleCheck,
  };
};

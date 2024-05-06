import { skipToken } from '@reduxjs/toolkit/dist/query';

import { useFetchPaymentOptionsQuery } from 'domains/account/actions/fetchPaymentOptions';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { ACTION_TEN_MINUTES_CACHE } from 'modules/common/constants/const';

export const useStablecoinsPaymentData = () => {
  const { isLoggedIn } = useAuth();

  useFetchPaymentOptionsQuery(isLoggedIn ? undefined : skipToken, {
    refetchOnMountOrArgChange: ACTION_TEN_MINUTES_CACHE,
  });
};

import { getSearch } from 'connected-react-router';
import { REFERRAL_CODE_QUERY_PARAM_NAME } from 'routes/constants';

import { useAppSelector } from 'store/useAppSelector';

export const useReferralCode = () => {
  const search = useAppSelector(getSearch);

  const queryParams = new URLSearchParams(search);

  const referralCode = queryParams.get(REFERRAL_CODE_QUERY_PARAM_NAME);

  return { referralCode };
};

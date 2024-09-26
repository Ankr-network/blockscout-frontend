import { REFERRAL_CODE_QUERY_PARAM_NAME } from 'routes/constants';

export const getReferralCodeFromUrl = () => {
  const { search } = window.location;

  const queryParams = new URLSearchParams(search);

  const referralCode =
    queryParams.get(REFERRAL_CODE_QUERY_PARAM_NAME) ?? undefined;

  return { referralCode };
};

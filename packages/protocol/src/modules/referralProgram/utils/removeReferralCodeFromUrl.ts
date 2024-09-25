import { REFERRAL_CODE_QUERY_PARAM_NAME } from 'routes/constants';

export const removeReferralCodeFromUrl = () => {
  const url = new URL(window.location.href);

  url.searchParams.delete(REFERRAL_CODE_QUERY_PARAM_NAME);

  // using history api to prevent page refreshing
  window.history.pushState({}, document.title, url);
};

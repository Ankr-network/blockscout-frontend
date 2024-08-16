import { makeStyles } from 'tss-react/mui';

import { MAX_REFERRAL_PAGE_WIDTH } from './const';

export const useReferralPageStyles = makeStyles()(() => ({
  referralPageRoot: {
    maxWidth: MAX_REFERRAL_PAGE_WIDTH,
    margin: '0 auto',
  },
}));

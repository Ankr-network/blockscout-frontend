import { makeStyles } from 'tss-react/mui';

import { MAX_REFERRAL_PAGE_WIDTH } from './const';

const name = 'ReferralPage';

export const useReferralPageStyles = makeStyles({ name })(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(10),

    maxWidth: MAX_REFERRAL_PAGE_WIDTH,
    margin: '0 auto',

    [theme.breakpoints.down('sm')]: {
      gap: theme.spacing(6),
    },
  },
}));

import { makeStyles } from 'tss-react/mui';

import topBanner from 'domains/referrals/assets/top-banner.png';

const name = 'TopBanner';

export const useTopBannerStyles = makeStyles({ name })(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
  },
  banner: {
    display: 'flex',
    alignItems: 'flex-end',

    height: 520,
    padding: theme.spacing(15, 8),

    background: `url(${topBanner}) lightgray 50% / cover no-repeat`,

    borderRadius: 20,

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4),

      height: 328,
    },
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: theme.spacing(7.5),

    width: '100%',
  },
  greeting: {
    flex: '1 1 0',
  },
  widget: {
    flex: '1 1 0',

    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  mobileWidget: {
    display: 'none',

    [theme.breakpoints.down('sm')]: {
      display: 'inherit',
    },
  },
}));

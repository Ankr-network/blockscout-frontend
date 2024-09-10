import { makeStyles } from 'tss-react/mui';

const name = 'ReferralBonusBanner';

export const useReferralBonusBannerStyles = makeStyles({ name })(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),

    color: theme.palette.text.primary,
  },
  description: {
    whiteSpace: 'pre-wrap',

    [theme.breakpoints.down('sm')]: {
      whiteSpace: 'normal',
    },
  },
}));

import { makeStyles } from 'tss-react/mui';

export const useReferralBonusBannerStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),

    color: theme.palette.text.primary,
  },
  description: {
    whiteSpace: 'pre-wrap',
  },
}));

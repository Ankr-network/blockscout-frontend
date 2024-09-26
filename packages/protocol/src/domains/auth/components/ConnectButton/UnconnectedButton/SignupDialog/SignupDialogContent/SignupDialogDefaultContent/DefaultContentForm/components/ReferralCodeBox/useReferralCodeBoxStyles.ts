import { makeStyles } from 'tss-react/mui';

export const useReferralCodeBoxStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),

    padding: theme.spacing(4, 3),

    borderRadius: 12,

    border: `2px solid ${theme.palette.background.default}`,
  },
}));

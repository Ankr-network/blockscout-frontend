import { makeStyles } from 'tss-react/mui';

export const useNextBillingDateStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),

    color: theme.palette.text.secondary,

    fontSize: 12,
    fontWeight: 500,
    lineHeight: '16.2px',
  },
  icon: {
    color: theme.palette.primary.main,
  },
}));

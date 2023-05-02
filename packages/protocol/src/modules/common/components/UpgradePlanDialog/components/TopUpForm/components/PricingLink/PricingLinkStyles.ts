import { makeStyles } from 'tss-react/mui';

export const usePricingLinkStyles = makeStyles()(theme => ({
  root: {
    textAlign: 'center',
  },
  link: {
    height: 20,
    padding: 0,
    minWidth: 'auto',
    minHeight: 20,

    letterSpacing: '0.01em',

    fontSize: 14,
    fontWeight: 500,
    lineHeight: '20px',

    '&:hover': {
      color: theme.palette.grey[900],

      backgroundColor: 'transparent',
    },
  },
}));

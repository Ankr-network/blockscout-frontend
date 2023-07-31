import { makeStyles } from 'tss-react/mui';

export const useBalanceStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: theme.spacing(2),
  },
  marker: {
    margin: theme.spacing(1.5, 1, 0, 0),
  },
  creditBalance: {
    whiteSpace: 'nowrap',

    color: theme.palette.text.primary,

    letterSpacing: '-0.04em',

    lineHeight: '105%',

    [theme.breakpoints.down('xs')]: {
      letterSpacing: '-0.03em',

      fontSize: 31,
      lineHeight: '110%',
    },
  },
  usdBalance: {
    color: theme.palette.text.secondary,

    letterSpacing: '-0.01em',

    lineHeight: '140%',
  },
}));

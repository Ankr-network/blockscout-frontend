import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
  top: {
    width: '100%',

    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: theme.spacing(3),
    },
  },
  paymentsHistoryTitle: {
    flexShrink: 0,

    color: theme.palette.text.primary,

    letterSpacing: '-0.03em',
  },
  preloader: {
    height: theme.spacing(14),
  },
}));

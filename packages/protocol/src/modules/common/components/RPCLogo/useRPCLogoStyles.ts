import { makeStyles } from 'tss-react/mui';

export const useRPCLogoStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),

    [theme.breakpoints.down('sm')]: {
      gap: theme.spacing(1),
    },
  },
  icon: {
    fontSize: 32,
    color: theme.palette.primary.main,

    [theme.breakpoints.down('sm')]: {
      fontSize: 28,
    },
  },
  text: {
    cursor: 'default',

    fontSize: 24,
    lineHeight: 1.15,

    [theme.breakpoints.down('sm')]: {
      letterSpacing: '-0.03em',

      fontSize: 21,
    },
  },
}));

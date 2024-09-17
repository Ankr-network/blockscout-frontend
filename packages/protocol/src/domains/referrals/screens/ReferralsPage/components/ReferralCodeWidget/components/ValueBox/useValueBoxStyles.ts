import { makeStyles } from 'tss-react/mui';

const name = 'ValueBox';

export const useValieBoxStyles = makeStyles({ name })(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),

    color: theme.palette.text.primary,
  },
  box: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(2),

    padding: theme.spacing(2, 2, 2, 4),

    borderRadius: theme.shape.borderRadius,

    backgroundColor: theme.palette.background.default,

    textWrap: 'nowrap',

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1, 2, 1, 3),

      borderRadius: 12,
    },
  },
  skeleton: {
    height: 48,

    borderRadius: theme.shape.borderRadius,

    [theme.breakpoints.down('sm')]: {
      height: 32,

      borderRadius: 12,
    },
  },
}));

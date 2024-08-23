import { makeStyles } from 'tss-react/mui';

const name = 'InviteWidget';

export const useInviteWidgetStyles = makeStyles({ name })(theme => ({
  root: {
    position: 'relative',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    height: 248,

    [theme.breakpoints.down('sm')]: {
      position: 'static',

      height: 'auto',
    },
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
  },
  title: {
    color: theme.palette.text.primary,
  },
  description: {
    maxWidth: 190,

    color: theme.palette.text.secondary,

    [theme.breakpoints.down('sm')]: {
      maxWidth: 'none',
    },
  },
  footer: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  button: {
    width: 'fit-content',
  },
  image: {
    position: 'absolute',
    right: 20,
    bottom: 20,

    width: 140,
    height: 140,

    [theme.breakpoints.down('sm')]: {
      position: 'static',

      width: 80,
      height: 80,
    },
  },
}));

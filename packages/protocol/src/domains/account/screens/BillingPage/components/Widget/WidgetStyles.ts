import { makeStyles } from 'tss-react/mui';

export const useWidgetStyles = makeStyles()(theme => ({
  root: {
    position: 'relative',

    padding: theme.spacing(8),

    borderRadius: 30,

    backgroundColor: theme.palette.background.paper,
  },
  content: {
    height: '100%',

    [theme.breakpoints.down('xs')]: {
      height: 'unset',
    },
  },
  actions: {
    position: 'absolute',
    top: 29,
    right: 194,

    display: 'flex',
    gap: theme.spacing(3),

    [theme.breakpoints.down('xs')]: {
      position: 'static',

      flexDirection: 'column',
      gap: theme.spacing(2),

      marginTop: theme.spacing(5),
    },
  },
}));

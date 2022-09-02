import { makeStyles } from '@material-ui/core';

export const useSectionStyles = makeStyles(theme => ({
  box: {
    position: 'relative',
    padding: theme.spacing(7.5, 0),
  },

  wrapper: {
    maxWidth: 715,
    padding: theme.spacing(0, 2.5),
  },

  title: {
    marginBottom: theme.spacing(3),
    fontSize: 24,

    [theme.breakpoints.up('md')]: {
      fontSize: 30,
      textAlign: 'center',
      marginBottom: theme.spacing(6),
    },
  },
}));

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
    textAlign: 'center',
    marginBottom: theme.spacing(6),
  },
}));

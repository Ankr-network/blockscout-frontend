import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    marginBottom: theme.spacing(4),
  },
  top: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(3.5),
  },
  img: {
    marginBottom: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  links: {
    display: 'flex',
    gap: theme.spacing(0, 2),

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  endpoints: {
    marginTop: theme.spacing(4),
  },
  endpoint: {
    marginBottom: theme.spacing(3),
  },
}));

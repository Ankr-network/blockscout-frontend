import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  button: {
    height: 23,
    padding: 0,

    [theme.breakpoints.down('xs')]: {
      fontSize: 12,
    },
  },
  title: {
    fontWeight: 600,

    [theme.breakpoints.down('xs')]: {
      fontSize: 12,
    },
  },
  // skeleton styles
  mainTitle: {
    width: theme.spacing(18),
    height: 23,
    marginBottom: 37,
  },
  groupTitle: {
    width: theme.spacing(18.75),
    height: theme.spacing(2.5),
    marginBottom: theme.spacing(2.25),
  },
  endpoints: {
    display: 'flex',
    gap: theme.spacing(2),

    paddingBottom: theme.spacing(3),
  },
  endpoint: {
    width: '50%',
    height: theme.spacing(5),

    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));

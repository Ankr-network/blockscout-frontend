import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    background: theme.palette.background.default,
    borderRadius: 18,
    padding: theme.spacing(0, 3, 3, 0),

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 2.5, 2.5, 0),
    },
  },
  info: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(4),
    padding: theme.spacing(0, 4),
    width: '100%',
  },
  container: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      marginBottom: theme.spacing(2),
      padding: theme.spacing(0, 2.5),
    },
  },
  mobileRequests: {
    display: 'none',
    paddingTop: theme.spacing(2.5),

    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  mobileRequestsTitle: {
    marginBottom: theme.spacing(1),
  },
  mobileRequestsSubtitle: {
    fontSize: 20,
  },
}));

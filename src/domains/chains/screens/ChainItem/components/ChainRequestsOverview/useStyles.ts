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
  rootSkeleton: {
    background: theme.palette.background.default,
    borderRadius: 18,
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2.5),
    },
  },
  info: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(4),
    padding: theme.spacing(0, 4),
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      paddingRight: 0,
    },
  },
  infoSkeleton: {
    height: 270,
    margin: theme.spacing(0, 4),
    position: 'relative',
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
  skeleton: {
    width: '30%',
    paddingTop: theme.spacing(3),
  },
  buttonGroup: {
    marginTop: theme.spacing(3.5),
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 9,
    paddingLeft: theme.spacing(3),
  },
  toggleButtonGroup: {
    maxWidth: 320,

    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    },

    '& button': {
      width: 'auto',

      [theme.breakpoints.down('sm')]: {
        width: '33.3%',
      },
    },
  },
}));

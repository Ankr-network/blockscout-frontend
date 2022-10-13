import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useEnterpriseBlockStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: theme.spacing(5),
    padding: theme.spacing(5),
    width: '100%',
    marginTop: theme.spacing(4),
    background:
      'linear-gradient(90deg, #1F2226 0%, #6235D0 59.48%, #356DF3 100%)',

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(5, 3.5),
      borderRadius: theme.spacing(4),
    },

    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(3.5),
      flexDirection: 'column',
    },
  },
  container: {
    width: '100%',
  },
  label: {
    fontSize: 20,

    [theme.breakpoints.down('xs')]: {
      fontSize: 16,
    },
  },
  title: {
    marginTop: theme.spacing(1),
    fontSize: 35,
    color: theme.palette.common.white,

    [theme.breakpoints.down('sm')]: {
      fontSize: 28,
    },
  },
  link: {
    width: 148,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginTop: theme.spacing(3.5),
    },
  },
  subtitle: {
    color: theme.palette.common.white,
    fontWeight: 400,
  },
}));

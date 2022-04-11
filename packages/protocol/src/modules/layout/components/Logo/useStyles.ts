import { makeStyles, Theme } from '@material-ui/core';

export const SIDEBAR_WIDTH = 220;

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: 40,
    paddingRight: theme.spacing(2),
  },
  logo: {
    fontSize: 34,
    color: theme.palette.primary.main,

    [theme.breakpoints.down('sm')]: {
      fontSize: 32,
    },
  },
  divider: {
    margin: theme.spacing(0, 2.3),
    backgroundColor: '#EBEDF2',

    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(0, 2),
    },
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: theme.spacing(1),
    lineHeight: 1,
  },
}));

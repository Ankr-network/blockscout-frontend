import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    marginBottom: theme.spacing(4),
  },
  header: {
    padding: theme.spacing(2, 0),
  },

  tableContainer: {
    '&&': {
      padding: 0,
    },
  },

  flag: {
    marginBottom: '3px',
  },
  preloader: {
    height: theme.spacing(8.25),
  },
}));

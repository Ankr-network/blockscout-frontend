import { alpha, makeStyles } from '@material-ui/core';

export const useActionCellStyles = makeStyles(theme => ({
  chip: {
    width: 100,
    height: 28,
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    color: theme.palette.primary.main,
    borderRadius: 8,
  },

  btn: {
    height: 40,
    lineHeight: 40,
    width: 100,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    margin: theme.spacing(0.5, 0, 0.5, 0.5),
    backgroundColor: theme.palette.background.paper,

    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(0, 0, 0, 1.5),
    },
  },
}));

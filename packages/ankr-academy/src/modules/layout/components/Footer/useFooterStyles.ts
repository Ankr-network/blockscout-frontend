import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useFooterStyles = makeStyles<Theme>(theme => ({
  component: {
    padding: 0,
  },
  inner: {
    backgroundColor: theme.palette.background.paper,
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      paddingBottom: 0,
    },
  },
}));

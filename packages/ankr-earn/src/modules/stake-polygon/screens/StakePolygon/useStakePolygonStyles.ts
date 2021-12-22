import { makeStyles, Theme } from '@material-ui/core';

export const useStakePolygonStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(5, 0),

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(8, 0),
    },
  },
}));

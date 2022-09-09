import { makeStyles } from '@material-ui/core';

export const useStakePolygonStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5, 0),

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(8, 0),
    },
  },

  questionBtn: {
    color: theme.palette.common.white,
  },

  stepper: {
    maxWidth: 340,
    margin: theme.spacing(0, 'auto', 0, 'auto'),
  },
}));

import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useMethodCallStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(4, 3.75, 3.125, 3.125),
    borderRadius: theme.spacing(3),
    background: theme.palette.background.paper,
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2.5),
    },
    '& .recharts-tooltip-wrapper': {
      zIndex: 100,
    },
  },
  loading: {
    height: theme.spacing(30),
  },
  content: {
    borderTop: `1px solid ${theme.palette.grey[400]}`,
    paddingTop: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
  noData: {
    height: theme.spacing(30),
  },
}));

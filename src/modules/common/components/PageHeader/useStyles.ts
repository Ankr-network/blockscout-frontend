import { Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
  },
  left: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    marginRight: theme.spacing(1.5),
  },
}));

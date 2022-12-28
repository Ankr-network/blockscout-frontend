import { Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  userStats: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
    marginBottom: theme.spacing(5.25),
  },
}));

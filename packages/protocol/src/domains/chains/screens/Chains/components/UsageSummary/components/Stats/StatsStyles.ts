import { Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  stats: {
    display: 'flex',
    gap: theme.spacing(3.75),

    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  stat: {
    flex: '0 0 50%',
  },
}));

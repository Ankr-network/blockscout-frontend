import { Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  stats: {
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: theme.spacing(3.5),

    [theme.breakpoints.down('lg')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },

    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr',
    },
  },
}));

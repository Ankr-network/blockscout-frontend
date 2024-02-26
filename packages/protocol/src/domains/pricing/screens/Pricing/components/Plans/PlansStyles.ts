import { makeStyles } from 'tss-react/mui';

export const usePlansStyles = makeStyles<void>()(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: theme.spacing(5),
    marginBottom: theme.spacing(30),

    [theme.breakpoints.down('lg')]: {
      gridTemplateColumns: '1fr',
      marginBottom: theme.spacing(20),
    },

    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(10),
    },
  },
}));

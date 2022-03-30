import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  title: {
    fontWeight: 600,

    [theme.breakpoints.down('xs')]: {
      fontSize: 12,
    },
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),

    marginTop: theme.spacing(3),
  },
  section: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: theme.spacing(2),

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(0, 1fr))',
    },
  },
  copyToClip: {
    width: '100%',
  },
  label: {
    marginTop: theme.spacing(1),
  },
}));

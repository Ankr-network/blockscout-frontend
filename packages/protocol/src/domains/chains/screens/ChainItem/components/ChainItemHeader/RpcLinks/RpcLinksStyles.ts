import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  text: {
    fontWeight: 600,
  },
  textPublic: {
    marginBottom: theme.spacing(2),
  },
  copyToClip: {
    minWidth: 330,
    width: '100%',

    [theme.breakpoints.down('lg')]: {
      minWidth: 'auto',
    },
  },
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, calc(50% - 8px))',

    gap: theme.spacing(0, 2),

    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '100%',
    },
  },
  link: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  section: {
    marginBottom: theme.spacing(2),
  },
  label: {
    marginTop: theme.spacing(1),
  },
}));

import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  top: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  text: {
    fontWeight: 700,
  },

  tooltipWrapper: {
    marginBottom: theme.spacing(2),
    alignItems: 'flex-end',
  },
  tooltipIcon: {
    '& circle': {
      fill: theme.palette.background.default,
    },
  },

  copyToClip: {
    minWidth: 330,
    width: '100%',

    [theme.breakpoints.down('lg')]: {
      minWidth: 'auto',
    },
  },
  label: {
    marginTop: theme.spacing(1),
  },
}));

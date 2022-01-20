import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useMyRewardsStyles = makeStyles<Theme>(theme => ({
  button: {
    position: 'relative',

    '& svg': {
      position: 'absolute',
    },
  },

  projectBox: {
    display: 'inline-flex',

    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  tooltipBox: {
    margin: theme.spacing(0, 0, '-3px', 0),
  },

  buttonCol: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  connectTooltip: {
    margin: theme.spacing(0, 0, 0, 1),
  },

  noCrowdloanArea: {
    padding: theme.spacing(19, 0, 8, 0),
  },
}));
